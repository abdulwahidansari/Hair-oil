import nodemailer from "nodemailer";

import {
  formatPKR,
  MAX_QUANTITY,
  priceOrder,
  type OrderLineInput,
} from "@/lib/catalog";

const MAX_FIELD_LENGTH = 300;
const MAX_CART_LINES = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** A trimmed, length-limited string; anything that isn't text becomes "". */
function cleanText(value: unknown, max = MAX_FIELD_LENGTH): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readItems(value: unknown): OrderLineInput[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.slice(0, MAX_CART_LINES).flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) {
      return [];
    }
    const { slug, quantity } = entry as { slug?: unknown; quantity?: unknown };
    if (typeof slug !== "string") {
      return [];
    }
    const parsed = Number(quantity);
    return [{ slug, quantity: Number.isFinite(parsed) ? Math.min(MAX_QUANTITY, parsed) : 1 }];
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (typeof body !== "object" || body === null) {
      return json({ success: false, message: "Invalid order request." }, 400);
    }

    const contactEmail = cleanText(body.contactEmail);
    const firstName = cleanText(body.firstName, 100);
    const lastName = cleanText(body.lastName, 100);
    const address = cleanText(body.address);
    const apartment = cleanText(body.apartment);
    const city = cleanText(body.city, 100);
    const postalCode = cleanText(body.postalCode, 20);
    const phone = cleanText(body.phone, 30);

    if (!firstName || !lastName || !address || !city || !phone) {
      return json({ success: false, message: "Please fill in all required fields." }, 400);
    }

    if (contactEmail && !EMAIL_PATTERN.test(contactEmail)) {
      return json({ success: false, message: "Please enter a valid email address." }, 400);
    }

    // Prices come from the catalog on the server; nothing price-related is read from the browser.
    const order = priceOrder(readItems(body.items));

    if (order.lines.length === 0) {
      return json(
        { success: false, message: "Your cart is empty or contains unavailable products." },
        400,
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const recipientEmails =
      process.env.RECIPIENT_EMAILS || process.env.RECIPIENT_EMAIL || gmailUser || "";

    // Split multiple emails if comma-separated, otherwise use single email
    const recipients = recipientEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!gmailUser || !gmailPass || recipients.length === 0) {
      return json(
        {
          success: false,
          message: "Email environment variables are not configured on the server.",
        },
        500,
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const customerName = `${firstName} ${lastName}`;
    const subject = `New Order - ${order.itemCount} item${order.itemCount > 1 ? "s" : ""} - ${customerName}`
      .replace(/[\r\n]+/g, " ");

    const lineRows = order.lines
      .map(
        (line) => `
        <tr>
          <td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(line.product.name)}</td>
          <td style="padding:6px 12px;border:1px solid #ddd;text-align:center">${line.quantity}</td>
          <td style="padding:6px 12px;border:1px solid #ddd;text-align:right">${escapeHtml(formatPKR(line.unitPrice))}</td>
          <td style="padding:6px 12px;border:1px solid #ddd;text-align:right">${escapeHtml(formatPKR(line.lineTotal))}</td>
        </tr>`,
      )
      .join("");

    const html = `
      <h2>New Order Received</h2>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${escapeHtml(customerName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contactEmail || "-")}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Address:</strong> ${escapeHtml(address)}${apartment ? ", " + escapeHtml(apartment) : ""}</p>
      <p><strong>City:</strong> ${escapeHtml(city)}${postalCode ? " (" + escapeHtml(postalCode) + ")" : ""}</p>

      <h3>Order Details</h3>
      <table style="border-collapse:collapse">
        <thead>
          <tr>
            <th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Product</th>
            <th style="padding:6px 12px;border:1px solid #ddd">Qty</th>
            <th style="padding:6px 12px;border:1px solid #ddd;text-align:right">Unit price</th>
            <th style="padding:6px 12px;border:1px solid #ddd;text-align:right">Line total</th>
          </tr>
        </thead>
        <tbody>${lineRows}</tbody>
      </table>

      <h3>Pricing</h3>
      <p><strong>Subtotal:</strong> ${escapeHtml(formatPKR(order.subtotal))}</p>
      <p><strong>Shipping:</strong> ${escapeHtml(formatPKR(order.shipping))}</p>
      <p><strong>Total savings:</strong> ${escapeHtml(formatPKR(order.savings))}</p>
      <p><strong>Order total (cash on delivery):</strong> ${escapeHtml(formatPKR(order.total))}</p>
    `;

    await transporter.sendMail({
      from: `"CoElegance Store" <${gmailUser}>`,
      to: recipients.join(", "),
      replyTo: contactEmail || gmailUser,
      subject,
      html,
    });

    return json({ success: true, message: "Order email sent.", total: order.total }, 200);
  } catch (error) {
    console.error("Order email error:", error);
    return json({ success: false, message: "Failed to send order email." }, 500);
  }
}

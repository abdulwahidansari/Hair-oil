import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      contactEmail,
      firstName,
      lastName,
      address,
      apartment,
      city,
      postalCode,
      phone,
      product,
      pricing,
    } = body;

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const recipientEmails = process.env.RECIPIENT_EMAILS || process.env.RECIPIENT_EMAIL || gmailUser || '';
    
    // Split multiple emails if comma-separated, otherwise use single email
    const recipients = recipientEmails.includes(',') 
      ? recipientEmails.split(',').map(email => email.trim())
      : [recipientEmails];

    if (!gmailUser || !gmailPass || !recipients.length) {
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Email environment variables are not configured on the server.",
        }),
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const subject = `New Order - ${product?.name ?? "CoElegance Order"}`;

    const html = `
      <h2>New Order Received</h2>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${contactEmail || "-"}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}${
        apartment ? ", " + apartment : ""
      }</p>
      <p><strong>City:</strong> ${city}${
        postalCode ? " (" + postalCode + ")" : ""
      }</p>

      <h3>Order Details</h3>
      <p><strong>Product:</strong> ${product?.name}</p>
      <p><strong>Variant:</strong> ${product?.variant}</p>
      <p><strong>Pack size (bottles):</strong> ${product?.packSize}</p>
      <p><strong>Quantity (packs):</strong> ${product?.quantity}</p>
      <p><strong>Total bottles:</strong> ${product?.totalBottles}</p>

      <h3>Pricing</h3>
      <p><strong>Unit price:</strong> ${pricing?.unitPrice}</p>
      <p><strong>Subtotal:</strong> ${pricing?.subtotal}</p>
      <p><strong>Shipping:</strong> ${pricing?.shipping}</p>
      <p><strong>Total savings:</strong> ${pricing?.savings}</p>
      <p><strong>Order total:</strong> ${pricing?.total}</p>
    `;

    await transporter.sendMail({
      from: `"CoElegance Store" <${gmailUser}>`,
      to: recipients.join(', '),
      replyTo: contactEmail || gmailUser,
      subject,
      html,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Order email sent." }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Order email error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send order email.",
      }),
      { status: 500 },
    );
  }
}


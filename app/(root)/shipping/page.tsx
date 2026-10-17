import Link from "next/link";

import { formatPKR, SHIPPING_FEE } from "@/lib/catalog";

/** Update this date whenever the text on this page changes. */
const LAST_UPDATED = "17 October 2026";

const CONTACT_EMAIL = "coeleganceintl@gmail.com";
const CONTACT_PHONE = "+92 307 1123512";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Shipping &amp; Delivery</h1>
          <p className="mt-2 text-sm text-gray-600">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="space-y-8 leading-relaxed text-gray-600">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Where we deliver</h2>
            <p>
              We deliver to addresses across Pakistan, including Karachi, Lahore, Islamabad,
              Peshawar and Quetta. We do not ship outside Pakistan at the moment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Delivery time</h2>
            <p>
              We usually dispatch your order within 1 working day. Delivery then takes about 2 to 7
              working days, depending on your city and the courier. These are estimates, not
              guarantees, and busy periods such as sales or public holidays can add time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Delivery fee</h2>
            <p>
              A flat delivery fee of {formatPKR(SHIPPING_FEE)} is added to each order. You will see
              it, together with the full total, at checkout before you place your order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Payment: cash on delivery</h2>
            <p>
              You pay the courier in cash when your order arrives. Please keep the exact amount
              ready if you can. Orders above Rs 3,000 are confirmed by phone before they are
              dispatched, and we may ask for part of the payment in advance for some of these
              orders. See our{" "}
              <Link href="/terms" className="underline">
                Terms
              </Link>{" "}
              for details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">After you order</h2>
            <p>
              We may call or message you on the phone number you gave to confirm your order and
              address. Please make sure that number is correct and that someone can answer or
              receive the parcel. If the courier cannot reach you, your order may be returned to
              us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">If your order arrives damaged</h2>
            <p>
              Check your parcel when it arrives. If an item is damaged or not what you ordered,
              contact us within 24 hours of delivery with your order number and clear photos. Our{" "}
              <Link href="/refund" className="underline">
                Refund &amp; Exchange Policy
              </Link>{" "}
              explains the steps.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Questions about your delivery</h2>
            <p>
              Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>{" "}
              or call{" "}
              <a href="tel:+923071123512" className="underline">
                {CONTACT_PHONE}
              </a>
              . Our team is available Monday to Saturday, 9:30am to 10:00pm, and Sunday, 11am to
              8pm. You can also reach us through the{" "}
              <Link href="/contact" className="underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

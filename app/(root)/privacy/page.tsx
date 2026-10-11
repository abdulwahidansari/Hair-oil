import Link from "next/link";

/** Update this date whenever the policy text changes. */
const LAST_UPDATED = "11 October 2026";

const CONTACT_EMAIL = "coeleganceintl@gmail.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-600">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="space-y-8 leading-relaxed text-gray-600">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Who we are</h2>
            <p>
              CoElegance is a herbal hair care brand based in Karachi, Pakistan. This policy
              explains what personal information we collect when you visit www.coelegance.store
              or place an order, how we use it, and the choices you have.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Information we collect</h2>
            <p>
              <span className="font-semibold text-gray-900">When you place an order:</span> your
              first and last name, phone number, delivery address (including apartment, city and
              postal code), the products and quantities you ordered, and your email address if you
              choose to give one.
            </p>
            <p>
              <span className="font-semibold text-gray-900">When you contact us:</span> your name,
              phone number, email address and the message you send, by the contact form, email or
              WhatsApp.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Automatically:</span> technical and
              usage information such as your device and browser type, pages viewed, and how you
              arrived at our site, collected through cookies and similar tools (see below).
            </p>
            <p>
              We only accept cash on delivery, so we do not collect or store card or bank details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">How we use your information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To process, confirm and deliver your order and collect payment on delivery.</li>
              <li>To contact you about your order, delivery or a return or exchange.</li>
              <li>To answer questions you send us.</li>
              <li>To understand how the site is used and improve it.</li>
              <li>To measure and run our advertising.</li>
              <li>To meet legal, tax and accounting obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Who we share it with</h2>
            <p>We do not sell your personal information. We share it only as needed with:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-gray-900">Courier partners</span>, who receive
                your name, phone number and address to deliver your order.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Email provider (Gmail)</span>, which
                carries your order details to our team.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Analytics and advertising
                providers</span> (listed below), which receive usage data from your browser.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Authorities</span>, where the law
                requires it.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Cookies and third-party tools</h2>
            <p>This site uses the following tools, which may set cookies or read similar identifiers:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Google Tag Manager and Google Analytics, to measure traffic.</li>
              <li>Meta (Facebook) Pixel, to measure and run ads on Facebook and Instagram.</li>
              <li>Google AdSense, to serve ads.</li>
              <li>Vercel Analytics and Speed Insights, to measure site performance.</li>
            </ul>
            <p>
              Your cart is also kept in your browser&apos;s local storage so it is still there when
              you come back. You can block or delete cookies and local storage in your browser
              settings; parts of the site may not work properly if you do.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">How long we keep it</h2>
            <p>
              We keep order and contact information only for as long as we need it to fulfil your
              order, handle returns and complaints, and meet our legal and accounting duties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Your choices</h2>
            <p>
              You can ask us to show you the personal information we hold about you, correct it, or
              delete it where we are not required to keep it. Email{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              and we will reply as soon as we can.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Children</h2>
            <p>
              Our site is not aimed at children under 18, and we do not knowingly collect their
              information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Changes to this policy</h2>
            <p>
              If we change this policy we will post the new version here and update the date at
              the top. This policy is governed by the laws of Pakistan, in line with our{" "}
              <Link className="underline" href="/terms">
                Terms of Use
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            <p>
              CoElegance, Karachi, Pakistan · Phone{" "}
              <a className="underline" href="tel:+923071123512">
                +92 307 1123512
              </a>{" "}
              ·{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

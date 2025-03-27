"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RefundPolicy = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Refund & Exchange Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none sm:prose lg:prose-lg">
          <div className="space-y-8 text-gray-600">
            {/* Main Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">What is your Return/Exchange Policy?</h2>
              <div className="space-y-4">
                <p>
                  A product can only be returned or exchanged if it was found damaged upon receipt. We will facilitate you with the exchange or in case where the product delivered was not as per your specifications or damaged. You can contact our customer service through email by attaching the photographic evidence of the product received, picture of the invoice, or call and inform us about your order ID.
                </p>
                <p className="font-semibold text-gray-900">
                  Important: The complaint escalation period is only within a day that is 24 hours after the product is received by the customer. No complain after the stated time frame will be facilitated.
                </p>
                <p>
                  If any items in your order have been received in an unsatisfactory condition, please let us know within 24 hours of your order being received. Please send your order number, and clear photos of the damaged item alongside your pack slip using the CONTACT US section.
                </p>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-yellow-800">
                    Please note we cannot consider cases reported after 24 hours of the receipt of your items. Please do not dispose of the items as you may need to return them to be eligible for a refund.
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  No product/item ordered online can be exchanged at any of Saeed Ghani's retail stores.
                </p>
              </div>
            </section>

            {/* Defective Items */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">What if there is a defect in the order received, how should I inform you?</h2>
              <div className="space-y-4">
                <p>
                  In case of a defective item being delivered anywhere in Pakistan, Saeed Ghani will have our courier partner pick the defected item in packed form. Pickup timings and date will be notified to the customer in advance. The pick-up timings will be notified beforehand. However, photographic evidence of the product received, picture of the invoice and our courier's airway bill will be required through email on the customer service email id or WhatsApp. Upon receipt, Saeed Ghani shall issue a replacement against the product mentioned in the Invoice.
                </p>
                <p className="font-semibold text-gray-900">
                  Important: The complaint escalation period is only within a day that is 24 hours after the product is received by the customer. No complain after the stated time frame will be facilitated.
                </p>
                <p>
                  The product has to be returned in the same packaging as provided by the brand to let the exchange process happen smoothly. In situations otherwise, the additional charges of product handling will be borne by the customer.
                </p>
                <p className="font-semibold text-gray-900">
                  No product/item ordered online can be exchanged at any of Saeed Ghani Retail stores.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
              <p>
                If you have any questions about our Refund & Exchange Policy, please contact our customer service team through the CONTACT US section or email us at customercare@
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy; 
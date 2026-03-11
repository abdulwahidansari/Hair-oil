"use client";

// package
import Image from "next/image";
import { useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Text from "@/ui/text";
import Heading from "@/ui/head";

const BASE_PRODUCT = {
  name: "CoElegance Organic Herbal Hair Oil",
  variant: "1 Bottle",
  price: 1500,
  compareAtPrice: 2000,
  image: "/images/bottel.png",
};

const formatCurrency = (value: number) =>
  `Rs ${value.toLocaleString("en-PK")}.00`;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const packSizeParam = Number(searchParams.get("packSize") || "1");
  const quantityParam = Number(searchParams.get("quantity") || "1");

  const packSize =
    !Number.isFinite(packSizeParam) || packSizeParam < 1 || packSizeParam > 4
      ? 1
      : packSizeParam;
  const quantity =
    !Number.isFinite(quantityParam) || quantityParam < 1 || quantityParam > 20
      ? 1
      : quantityParam;

  const totalBottles = packSize * quantity;

  const subtotal = BASE_PRODUCT.price * totalBottles;
  const shipping = 200;
  const total = subtotal + shipping;
  const savingsPerUnit = BASE_PRODUCT.compareAtPrice - BASE_PRODUCT.price;
  const totalSavings = savingsPerUnit * totalBottles;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};

    const requiredFields = [
      "contactEmail",
      "firstName",
      "lastName",
      "address",
      "city",
      "phone",
    ];

    requiredFields.forEach((field) => {
      const value = (formData.get(field) || "").toString().trim();
      if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

    const email = (formData.get("contactEmail") || "").toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors["contactEmail"] = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    setFormTouched(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const productPayload = {
      name: BASE_PRODUCT.name,
      variant: `${packSize} Bottle${packSize > 1 ? "s" : ""}`,
      packSize,
      quantity,
      totalBottles,
    };

    const payload = {
      contactEmail: formData.get("contactEmail") || "",
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      address: formData.get("address") || "",
      apartment: formData.get("apartment") || "",
      city: formData.get("city") || "",
      postalCode: formData.get("postalCode") || "",
      phone: formData.get("phone") || "",
      product: productPayload,
      pricing: {
        unitPrice: formatCurrency(BASE_PRODUCT.price),
        subtotal: formatCurrency(subtotal),
        shipping: "200",
        savings: totalSavings > 0 ? formatCurrency(totalSavings) : "Rs 0.00",
        total: `PKR ${total.toLocaleString("en-PK")}`,
      },
    };

    setSubmitting(true);

    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to place order.");
        }
        setSubmitSuccess(true);
        // Redirect to thank you page so user sees clear confirmation.
        router.push("/thank-you");
      })
      .catch((err: any) => {
        setSubmitError(
          err?.message || "Something went wrong while sending your order.",
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <SectionLayout className="px-4 py-10 md:px-8 lg:px-12">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_1.4fr] lg:items-start"
        noValidate
      >
        {/* Left column: contact + delivery + payment */}
        <div className="space-y-8">
          <div>
            <Heading
              as="h1"
              intent="shop-page"
              className="mb-2 text-2xl md:text-3xl"
            >
              Checkout
            </Heading>
            <Text size="sm" className="text-sm text-[#4b5563]">
              Complete your details below to place your order with cash on
              delivery.
            </Text>
            {formTouched && Object.keys(errors).length > 0 && (
              <p className="mt-3 text-xs font-medium text-red-600 md:text-sm">
                Please fix the highlighted fields before completing your order.
              </p>
            )}
            {submitError && (
              <p className="mt-2 text-xs font-medium text-red-600 md:text-sm">
                {submitError}
              </p>
            )}
            {submitSuccess && !submitError && (
              <p className="mt-2 text-xs font-medium text-green-600 md:text-sm">
                Thank you! Your order has been submitted. We will contact you to
                confirm delivery.
              </p>
            )}
          </div>

          {/* Contact */}
          <section className="space-y-4">
            <Text size="sm" weight={600} className="text-[#111827]">
              Contact
            </Text>
            <div className="space-y-3">
              <input
                type="email"
                name="contactEmail"
                placeholder="Email or mobile phone number"
                className={`w-full rounded-md border px-3 py-2 text-sm text-[#111827] outline-none focus:ring-1 ${
                  errors.contactEmail
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-black"
                }`}
              />
              {errors.contactEmail && (
                <p className="text-xs text-red-500">{errors.contactEmail}</p>
              )}
              <label className="flex items-center gap-2 text-xs text-[#4b5563] md:text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                Email me with news and offers
              </label>
            </div>
          </section>

          {/* Delivery */}
          <section className="space-y-4 border-t border-gray-200 pt-6">
            <Text size="sm" weight={600} className="text-[#111827]">
              Delivery
            </Text>
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  name="firstName"
                  placeholder="First name"
                  className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
              <input
                name="address"
                placeholder="Address"
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                  errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-black"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
              <input
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  name="city"
                  placeholder="City"
                  className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                    errors.city
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />
                <input
                  name="postalCode"
                  placeholder="Postal code (optional)"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                />
              </div>
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
              <label className="flex items-center gap-2 text-xs text-[#4b5563] md:text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                Save this information for next time
              </label>
            </div>
          </section>

          {/* Shipping method */}
          <section className="space-y-4 border-t border-gray-200 pt-6">
            <Text size="sm" weight={600} className="text-[#111827]">
              Shipping method
            </Text>
            <div className="flex items-center justify-between rounded-lg border border-gray-400 bg-[#f5f5f5] px-4 py-3 text-sm text-[#111827]">
              <span>Standard</span>
              {/* <div className="flex items-center gap-3 text-xs md:text-sm">
                <span className="text-[#9ca3af] line-through">
                  {formatCurrency(200)}
                </span>
                <span className="font-semibold text-[#16a34a]">FREE</span>
              </div> */}
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-4 border-t border-gray-200 pt-6">
            <Text size="sm" weight={600} className="text-[#111827]">
              Payment
            </Text>
            <Text size="sm" className="text-xs text-[#6b7280] md:text-sm">
              All transactions are secure and encrypted. You will pay in cash at
              delivery.
            </Text>
            <div className="rounded-md border border-gray-300">
              <label className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="h-4 w-4 border-gray-400"
                  />
                  <span>Cash on Delivery (COD)</span>
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Right column: order summary */}
        <aside className="space-y-6 rounded-lg bg-[#f9fafb] p-6 lg:p-8">
          {/* Product list */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md bg-white">
                <Image
                  src={BASE_PRODUCT.image}
                  alt={BASE_PRODUCT.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs font-semibold text-white">
                  {totalBottles}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111827]">
                  {BASE_PRODUCT.name}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {packSize} Bottle{packSize > 1 ? "s" : ""} × {quantity} pack
                </p>
              </div>
              <p className="text-sm font-semibold text-[#111827]">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>

          {/* Discount code */}
          <div className="mt-2 flex gap-3">
            <input
              placeholder="Discount code"
              className="h-10 flex-1 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            <button className="h-10 rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-gray-900">
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#4b5563]">Subtotal</span>
              <span className="text-[#111827] font-medium">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4b5563]">Shipping</span>
              <span className="text-black font-medium">200</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex items-center justify-between text-xs text-[#16a34a]">
                <span>Total savings</span>
                <span>{formatCurrency(totalSavings)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-base font-semibold text-[#111827]">
                Total
              </span>
              <span className="text-base font-semibold text-[#111827]">
                PKR {total.toLocaleString("en-PK")}
              </span>
            </div>
          </div>

          {/* Complete order button */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-10 w-full rounded-md bg-black px-6 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70 lg:h-11 lg:text-base"
          >
            {submitting ? "Placing order..." : "Complete order"}
          </button>
        </aside>
      </form>
    </SectionLayout>
  );
}

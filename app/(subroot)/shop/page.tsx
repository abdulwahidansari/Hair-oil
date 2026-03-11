"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Text from "@/ui/text";
import Heading from "@/ui/head";
import Button from "@/ui/button";

const PACK_OPTIONS = [1, 2, 3, 4] as const;
const CURRENT_PRICE_PER_BOTTLE = 1500;
const ORIGINAL_PRICE_PER_BOTTLE = 2000;

const formatCurrency = (value: number) =>
  `Rs ${value.toLocaleString("en-PK")}.00`;

export default function Page() {
  const [packSize, setPackSize] = useState<(typeof PACK_OPTIONS)[number]>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const totalBottles = packSize * quantity;
  const currentTotal = CURRENT_PRICE_PER_BOTTLE * totalBottles;
  const originalTotal = ORIGINAL_PRICE_PER_BOTTLE * totalBottles;
  const savings = originalTotal - currentTotal;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const order = {
      productName: "CoElegance Organic Herbal Hair Oil",
      packSize,
      quantity,
      totalBottles,
      subtotal: currentTotal,
      subtotalFormatted: formatCurrency(currentTotal),
    };

    window.localStorage.setItem("currentOrder", JSON.stringify(order));
  }, [packSize, quantity, totalBottles, currentTotal]);

  return (
    <SectionLayout bg="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16 lg:flex-row lg:items-start lg:gap-12">
        {/* Left: product image */}
        <div className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 md:p-8 lg:w-1/2">
          <div className="w-full max-w-md">
            <Image
              src="/images/bottel.png"
              alt="CoElegance Organic Herbal Hair Oil bottle"
              width={480}
              height={480}
              className="mx-auto h-auto w-full max-w-xs object-contain md:max-w-sm"
            />
          </div>
        </div>

        {/* Right: product details */}
        <div className="w-full space-y-6 lg:w-1/2">
          <div>
            <Heading
              as="h1"
              intent="shop-page"
              className="mt-2 text-2xl md:text-3xl lg:text-4xl"
            >
              CoElegance Organic Herbal Hair Oil
            </Heading>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-3">
            <p className="text-2xl font-semibold text-[#111827] md:text-3xl">
              {formatCurrency(currentTotal)}
            </p>
            <p className="text-sm text-[#9ca3af] line-through">
              {formatCurrency(originalTotal)}
            </p>
            {savings > 0 && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Save {formatCurrency(savings).replace(".00", "")}
              </span>
            )}
          </div>

          <Text size="sm" className="max-w-xl text-sm text-[#4b5563] md:text-base">
            A powerful herbal blend with more than 20 natural ingredients to
            reduce hair fall, support new growth, and nourish your scalp.
            Lightweight, non-sticky and suitable for all hair types.
          </Text>

          {/* Bottle options */}
          <div className="space-y-3">
            <Text size="sm" weight={600} className="text-[#111827]">
              Quantity Options
            </Text>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PACK_OPTIONS.map((value) => {
                const label = `${value} Bottle${value > 1 ? "s" : ""}`;
                const isActive = packSize === value;

                return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setPackSize(value)}
                  className={`w-full rounded-full border px-4 py-2.5 text-xs font-medium transition-colors md:text-sm ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-800 hover:border-black"
                  }`}
                >
                  {label}
                </button>
              );
              })}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="space-y-3">
            <Text size="sm" weight={600} className="text-[#111827]">
              Quantity
            </Text>
            <div className="inline-flex w-full max-w-xs items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2.5 sm:max-w-sm">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-2 text-sm font-medium text-gray-700 hover:text-black md:text-base"
              >
                -
              </button>
              <span className="text-sm font-semibold text-gray-900 md:text-base">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
                className="px-2 text-sm font-medium text-gray-700 hover:text-black md:text-base"
              >
                +
              </button>
            </div>
            <Text size="sm" className="text-xs text-[#6b7280] md:text-sm">
              Total bottles:{" "}
              <span className="font-semibold text-[#111827]">{totalBottles}</span>
            </Text>
          </div>

          {/* COD button */}
          <div className="space-y-2">
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  packSize: packSize.toString(),
                  quantity: quantity.toString(),
                },
              }}
            >
              <Button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 md:text-base">
                Buy Now
              </Button>
            </Link>
            <Text size="sm" className="text-xs text-[#6b7280] md:text-sm">
              Shipping calculated at checkout. No advance payment required.
            </Text>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 text-xs text-[#4b5563] md:text-sm">
            <div>
              <p className="font-semibold text-[#111827]">
                100% Herbal Formula
              </p>
              <p>No parabens, mineral oil, or harsh chemicals.</p>
            </div>
            <div>
              <p className="font-semibold text-[#111827]">Cash on Delivery</p>
              <p>Pay at your doorstep anywhere in Pakistan.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

import { ProductImageGallery } from "@/components/product/product-image-gallery";

// ui
import Text from "@/ui/text";
import Heading from "@/ui/head";
import Button from "@/ui/button";

const PACK_OPTIONS = [1, 2, 3, 4] as const;
const CURRENT_PRICE_PER_BOTTLE = 1500;
const ORIGINAL_PRICE_PER_BOTTLE = 2000;

const formatCurrency = (value: number) => `Rs ${value.toLocaleString("en-PK")}.00`;

type AccordionSection = {
  id: string;
  title: string;
  content: ReactNode;
};

const PRODUCT_ACCORDION_SECTIONS: AccordionSection[] = [
  {
    id: "benefits",
    title: "Benefits",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Helps reduce hair fall and supports healthier-looking growth.</li>
        <li>Nourishes the scalp with a blend of 20+ natural ingredients.</li>
        <li>Lightweight, non-sticky feel suitable for daily use.</li>
        <li>The oil for hair growth strengthens hair roots.</li>
        <li>Hair growth oil accelerates hair growth.</li>
      </ul>
    ),
  },
  {
    id: "usage",
    title: "Usage",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Shake CoElegance Organic Hair Oil bottle well before use.</li>
        <li>Gently massage in circular motions for a few minutes into scalp and ends of hair.</li>
        <li>Leave on for at least 30 minutes, or overnight for deeper care.</li>
        <li>Wash with your usual shampoo. Use 2–3 times per week, or as needed.</li>
        <li>Do not use on cut, broken or irritated skin.</li>
        <li>Avoid contact with eyes. In the event of contact with eyes, rinse thoroughly with water.</li>
        <li>Do not use if you are sensitive or allergic to any of the ingredients.</li>
        <li>Store under 30°C and out of direct sunlight.</li>
        <li>For external use only.</li>
        </ul>
    ),
  },
  {
    id: "ingredients",
    title: "Ingredients",
    content: (
      <p>
        Mustard oil, Coconut oil, Sesame seeds, Jasmine oil, Jojoba oil, Olive oil, Rosemary essential oil, Argan oil, Avocado oil, Peppermint oil, Tea tree oil, Linseed oil, Almond oil, Vitamin E oil, Castor oil, Almonds, Beetroot, Ginger, Coriander leaves, Onions, Aloe vera, Amla, Fenugreek seeds, Terminalia chebula, Jatamansi, Sapindus mukorossi, Black cumin, Alkanet root, Cloves, Curry leaves, Shikakai.
      </p>
    ),
  },
];

export default function Page() {
  const [packSize, setPackSize] = useState<(typeof PACK_OPTIONS)[number]>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const totalBottles = packSize * quantity;
  const currentTotal = CURRENT_PRICE_PER_BOTTLE * totalBottles;
  const originalTotal = ORIGINAL_PRICE_PER_BOTTLE * totalBottles;
  const savings = originalTotal - currentTotal;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const order = {
      productName: "CoElegance Organic Hair Oil",
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-start lg:gap-10 lg:px-8 lg:py-16 xl:gap-12">
        <div className="min-w-0 w-full lg:sticky lg:top-24 lg:z-10 lg:w-1/2 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:self-start">
          <ProductImageGallery className="rounded-2xl border border-gray-100 bg-white shadow-sm" />
        </div>

        <div className="flex min-w-0 w-full flex-col space-y-6 lg:w-1/2 lg:space-y-7">
          <header className="space-y-3">
            <Heading
              as="h1"
              intent="shop-page"
              className="text-2xl font-semibold leading-tight tracking-tight text-[#111827] sm:text-3xl lg:text-[2rem] xl:text-4xl"
            >
              Organic Hair Oil
            </Heading>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-semibold tabular-nums text-[#111827] sm:text-3xl">
                {formatCurrency(currentTotal)}
              </p>
              <p className="text-sm tabular-nums text-[#9ca3af] line-through sm:text-base">
                {formatCurrency(originalTotal)}
              </p>
              {savings > 0 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Save {formatCurrency(savings).replace(".00", "")}
                </span>
              )}
            </div>
          </header>

          <Text size="sm" className="max-w-prose text-[15px] leading-relaxed text-[#4b5563] sm:text-base">
            A powerful herbal blend with more than 20 natural ingredients to reduce hair
            fall, support new growth, and nourish your scalp. Lightweight, non-sticky and
            suitable for all hair types.
          </Text>

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

          <div className="space-y-3">
            <Text size="sm" weight={600} className="text-[#111827]">
              Quantity
            </Text>
            <div className="inline-flex w-full max-w-full items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2.5 sm:max-w-xs">
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
              Total bottles: <span className="font-semibold text-[#111827]">{totalBottles}</span>
            </Text>
          </div>

          <div className="space-y-2">
            <Link
              href={`/checkout?packSize=${encodeURIComponent(String(packSize))}&quantity=${encodeURIComponent(String(quantity))}`}
            >
              <Button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 md:text-base">
                Buy Now
              </Button>
            </Link>
          </div>

          <div className="w-full border-t border-gray-200 pt-1">
            {PRODUCT_ACCORDION_SECTIONS.map((section) => {
              const isOpen = openAccordionId === section.id;
              return (
                <div key={section.id} className="border-b border-gray-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenAccordionId((prev) => (prev === section.id ? null : section.id))
                    }
                    className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-gray-50/80"
                  >
                    <span className="text-base font-medium text-[#111827]">{section.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#111827] transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={section.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.26, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm leading-relaxed text-[#4b5563]">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

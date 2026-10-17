"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { clampQuantity, formatPKR, MAX_QUANTITY } from "@/lib/catalog";
import { useCartStore } from "@/stores/cart";

type ProductPurchaseProps = {
  slug: string;
  /** Unit price in PKR. */
  price: number;
};

/** Quantity picker with "Add to cart" and "Buy now" for one product. */
export function ProductPurchase({ slug, price }: ProductPurchaseProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#111827]">Quantity</p>
        <div className="inline-flex w-full max-w-full items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2.5 sm:max-w-xs">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((prev) => clampQuantity(prev - 1))}
            className="px-2 text-sm font-medium text-gray-700 hover:text-black md:text-base"
          >
            -
          </button>
          <span className="text-sm font-semibold text-gray-900 md:text-base" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((prev) => Math.min(MAX_QUANTITY, prev + 1))}
            className="px-2 text-sm font-medium text-gray-700 hover:text-black md:text-base"
          >
            +
          </button>
        </div>
        <p className="text-xs text-[#6b7280] md:text-sm">
          Total:{" "}
          <span className="font-semibold text-[#111827]">{formatPKR(price * quantity)}</span>
          {quantity > 1 && <> · {formatPKR(price)} each</>}
        </p>
      </div>

      <div className="space-y-3">
        <AddToCartButton slug={slug} quantity={quantity} className="py-3 md:text-base" />
        <button
          type="button"
          onClick={() => {
            addItem(slug, quantity);
            router.push("/checkout");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 md:text-base"
        >
          Buy now
        </button>
        <p className="text-center text-xs text-[#6b7280] sm:text-sm">
          Nationwide delivery · Pay on delivery
        </p>
      </div>
    </div>
  );
}

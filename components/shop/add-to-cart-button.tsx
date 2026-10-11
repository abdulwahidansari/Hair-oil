"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";

type AddToCartButtonProps = {
  slug: string;
  quantity?: number;
  className?: string;
  label?: string;
};

/** "Add to cart" button that confirms briefly once the item is in the cart. */
export function AddToCartButton({
  slug,
  quantity = 1,
  className,
  label = "Add to cart",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(slug, quantity);
        setAdded(true);
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => setAdded(false), 1800);
      }}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full border border-black bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white",
        added && "border-green-600 bg-green-600 text-white hover:bg-green-600",
        className,
      )}
      aria-live="polite"
    >
      {added ? "Added to cart ✓" : label}
    </button>
  );
}

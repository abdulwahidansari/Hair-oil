"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import {
  formatPKR,
  MAX_QUANTITY,
  priceOrder,
  productHref,
} from "@/lib/catalog";
import { useCartStore } from "@/stores/cart";

/** The cart page: items, quantity controls, totals and a checkout button. */
export function CartView() {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const totals = useMemo(() => priceOrder(items), [items]);

  if (!hydrated) {
    return (
      <p className="py-16 text-center text-sm text-[#6b7280]" aria-live="polite">
        Loading your cart…
      </p>
    );
  }

  if (totals.lines.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <p className="text-base text-[#111827]">Your cart is empty.</p>
        <Link
          href="/shop"
          className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-900"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {totals.lines.map((line) => {
          const image = line.product.images[0];
          return (
            <li key={line.product.slug} className="flex gap-4 py-5">
              <Link
                href={productHref(line.product)}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#faf4e8]"
              >
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={productHref(line.product)}
                      className="text-sm font-semibold text-[#111827] hover:underline md:text-base"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-xs text-[#6b7280]">{formatPKR(line.unitPrice)} each</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-[#111827] md:text-base">
                    {formatPKR(line.lineTotal)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-gray-300">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${line.product.name}`}
                      onClick={() => setQuantity(line.product.slug, line.quantity - 1)}
                      disabled={line.quantity <= 1}
                      className="px-3 py-1.5 text-sm text-gray-700 hover:text-black disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${line.product.name}`}
                      onClick={() => setQuantity(line.product.slug, line.quantity + 1)}
                      disabled={line.quantity >= MAX_QUANTITY}
                      className="px-3 py-1.5 text-sm text-gray-700 hover:text-black disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.product.slug)}
                    className="text-xs font-medium text-[#6b7280] underline hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="space-y-4 rounded-lg bg-[#f9fafb] p-6">
        <h2 className="text-base font-semibold text-[#111827]">Order summary</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-[#4b5563]">Subtotal ({totals.itemCount} items)</dt>
            <dd className="font-medium text-[#111827]">{formatPKR(totals.subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[#4b5563]">Shipping</dt>
            <dd className="font-medium text-[#111827]">{formatPKR(totals.shipping)}</dd>
          </div>
          {totals.savings > 0 && (
            <div className="flex items-center justify-between text-xs text-[#16a34a]">
              <dt>Total savings</dt>
              <dd>{formatPKR(totals.savings)}</dd>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base font-semibold text-[#111827]">
            <dt>Total</dt>
            <dd>{formatPKR(totals.total)}</dd>
          </div>
        </dl>
        <p className="text-xs text-[#6b7280]">Pay in cash when your order is delivered.</p>
        <Link
          href="/checkout"
          className="flex h-11 w-full items-center justify-center rounded-md bg-black px-6 text-sm font-semibold text-white hover:bg-gray-900"
        >
          Checkout
        </Link>
        <Link
          href="/shop"
          className="block text-center text-sm font-medium text-[#4b5563] underline hover:text-black"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  clampQuantity,
  getProduct,
  isPurchasable,
  MAX_QUANTITY,
  type OrderLineInput,
} from "@/lib/catalog";

/**
 * Shopping cart. Only product slugs and quantities are stored (in the visitor's
 * browser); prices are always looked up from lib/catalog.ts, so a tampered
 * localStorage value can never change what someone pays.
 */
type CartState = {
  items: OrderLineInput[];
  /** True once the saved cart has been read from the browser. */
  hydrated: boolean;
  addItem: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,

      addItem: (slug, quantity = 1) => {
        const product = getProduct(slug);
        if (!product || !isPurchasable(product)) {
          return;
        }

        set((state) => {
          const existing = state.items.find((item) => item.slug === slug);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.slug === slug
                  ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + clampQuantity(quantity)) }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { slug, quantity: clampQuantity(quantity) }] };
        });
      },

      setQuantity: (slug, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        })),

      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "coelegance-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Read the saved cart after the page has loaded, so server and browser HTML match.
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/** Call once near the top of the page (the navbar does this) to load the saved cart. */
export function useHydrateCart(): void {
  useEffect(() => {
    let finished = false;
    const markReady = () => {
      if (!finished) {
        finished = true;
        useCartStore.setState({ hydrated: true });
      }
    };

    try {
      Promise.resolve(useCartStore.persist.rehydrate()).then(markReady, markReady);
    } catch {
      // Browser storage can be blocked (private mode); the cart then works for this visit only.
      markReady();
    }
  }, []);
}

/** Number of items in the cart, for the navbar badge. */
export function useCartCount(): number {
  return useCartStore((state) =>
    state.items.reduce((sum, item) => {
      const product = getProduct(item.slug);
      return product && isPurchasable(product) ? sum + item.quantity : sum;
    }, 0),
  );
}

import type { Metadata } from "next";

import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your CoElegance organic herbal hair oil order with cash on delivery across Pakistan.",
  ...canonicalFor("/checkout"),
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

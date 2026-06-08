import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/checkout", {
  title: "Checkout",
  description:
    "Complete your CoElegance organic herbal hair oil order with cash on delivery across Pakistan.",
  robots: { index: false, follow: false },
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

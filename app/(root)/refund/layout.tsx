import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/refund", {
  title: "Refund Policy",
  description:
    "CoElegance refund and return policy for organic herbal hair oil orders in Pakistan.",
});

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

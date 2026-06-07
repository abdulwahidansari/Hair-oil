import type { Metadata } from "next";

import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "CoElegance refund and return policy for organic herbal hair oil orders in Pakistan.",
  ...canonicalFor("/refund"),
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "CoElegance terms of use for shopping organic herbal hair oil products in Pakistan.",
  ...canonicalFor("/terms"),
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

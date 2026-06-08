import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/terms", {
  title: "Terms of Use",
  description:
    "CoElegance terms of use for shopping organic herbal hair oil products in Pakistan.",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

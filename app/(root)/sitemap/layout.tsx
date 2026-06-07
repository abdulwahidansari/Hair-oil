import type { Metadata } from "next";

import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all pages on the CoElegance website.",
  ...canonicalFor("/sitemap"),
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

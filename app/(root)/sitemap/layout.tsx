import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/sitemap", {
  title: "Sitemap",
  description: "Browse all pages on the CoElegance website.",
});

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

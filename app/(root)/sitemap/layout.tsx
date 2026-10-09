import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/sitemap", {
  title: "Sitemap",
  description: "Browse all pages on the CoElegance website.",
  // Utility page for visitors; keep it out of search results but let bots follow its links.
  robots: { index: false, follow: true },
});

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Sitemap", path: "/sitemap" },
        ])}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/privacy", {
  title: "Privacy Policy",
  description:
    "How CoElegance collects, uses and protects your personal information when you browse or order from our store in Pakistan.",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      {children}
    </>
  );
}

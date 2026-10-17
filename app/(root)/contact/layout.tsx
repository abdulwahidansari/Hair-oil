import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/contact", {
  title: { absolute: "Contact CoElegance – Orders, Delivery & Support" },
  description:
    "Contact CoElegance by WhatsApp, phone or email for orders, delivery or product questions anywhere in Pakistan.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      {children}
    </>
  );
}

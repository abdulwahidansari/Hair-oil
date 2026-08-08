import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { privatePageMetadata } from "@/lib/site";

export const metadata: Metadata = privatePageMetadata("/checkout", {
  title: "Checkout",
  description:
    "Complete your CoElegance organic herbal hair oil order with cash on delivery across Pakistan.",
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Checkout", path: "/checkout" },
        ])}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { privatePageMetadata } from "@/lib/site";

export const metadata: Metadata = privatePageMetadata("/cart", {
  title: "Your Cart",
  description: "Review the items in your CoElegance cart before checkout.",
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Cart", path: "/cart" },
        ])}
      />
      {children}
    </>
  );
}

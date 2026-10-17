import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/shipping", {
  title: "Shipping & Delivery",
  description:
    "CoElegance delivers across Pakistan with cash on delivery. See delivery times, the delivery fee, and what to do if your order arrives damaged.",
});

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Shipping & Delivery", path: "/shipping" },
        ])}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { productPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "/products/coelegance-organic-hair-oil-best-seller",
  {
    title: "CoElegance Organic Herbal Hair Oil 200ml",
    description:
      "Buy CoElegance Organic Herbal Hair Oil 200ml in Pakistan. Herbal formula for hair fall control, stronger roots, dandruff care, and shinier hair.",
  },
  {
    images: ["/images/bottel.png"],
  },
);

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={productPageSchemaGraph()} />
      {children}
    </>
  );
}

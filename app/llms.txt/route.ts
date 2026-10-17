import { CATEGORIES, collectionHref, isPurchasable, PRODUCTS, productHref } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

// Rebuilt from the catalog on each deploy, so it never lists products that are not live.
export const dynamic = "force-static";

export function GET() {
  const liveProducts = PRODUCTS.filter(isPurchasable);

  const productLines = liveProducts.map(
    (product) =>
      `- [${product.name}](${siteUrl}${productHref(product)}): ${product.metaDescription}`,
  );

  const collectionLines = CATEGORIES.filter((category) =>
    liveProducts.some((product) => product.categories.includes(category.slug)),
  ).map(
    (category) =>
      `- [${category.name}](${siteUrl}${collectionHref(category)}): ${category.description}`,
  );

  const body = [
    "# CoElegance",
    "",
    "> CoElegance is a Karachi-based herbal hair care brand. We make herbal hair oil and shampoos in Pakistan and deliver nationwide with cash on delivery.",
    "",
    "## Products",
    ...productLines,
    "",
    "## Collections",
    ...collectionLines,
    "",
    "## Store information",
    `- [Shipping & delivery](${siteUrl}/shipping): delivery areas, times, fee and cash on delivery`,
    `- [Refund & exchange policy](${siteUrl}/refund): what to do if an order arrives damaged`,
    `- [About CoElegance](${siteUrl}/about): the brand and team`,
    `- [Contact](${siteUrl}/contact): WhatsApp, phone and email support`,
    `- [Blog](${siteUrl}/blog): hair care guides`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

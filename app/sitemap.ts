import type { MetadataRoute } from "next";

import products from "@/data/product.json";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coelegance.store";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "shop",
    "about",
    "blog",
    "contact",
    "refund",
    "terms",
    "sitemap",
    "cart",
    "checkout",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = (products as { id: number | string }[]).map(
    (product) => ({
      url: `${siteUrl}/products/${product.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...productEntries];
}


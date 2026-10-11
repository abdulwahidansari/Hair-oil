import type { MetadataRoute } from "next";

import { blogPostList } from "@/lib/blog-posts";
import {
  CATEGORIES,
  collectionHref,
  isPurchasable,
  PRODUCTS,
  productHref,
  productsInCategory,
} from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

/**
 * Only list pages that should rank. The HTML /sitemap page is noindex, so it
 * is intentionally left out, and so are "coming soon" products (their pages
 * are noindex until they launch).
 *
 * `lastModified` is omitted for static pages on purpose: stamping every URL
 * with the build time makes Google distrust the field. Add a real date here
 * only when that page's content actually changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "shop", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "refund", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: path ? `${siteUrl}/${path}` : siteUrl,
      changeFrequency,
      priority,
    }),
  );

  // A collection with nothing orderable yet would be a thin page, so it is left out.
  const collectionEntries: MetadataRoute.Sitemap = CATEGORIES.filter((category) =>
    productsInCategory(category.slug).some(isPurchasable),
  ).map((category) => ({
    url: `${siteUrl}${collectionHref(category)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.filter(isPurchasable).map(
    (product) => ({
      url: `${siteUrl}${productHref(product)}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = blogPostList.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries, ...blogEntries];
}

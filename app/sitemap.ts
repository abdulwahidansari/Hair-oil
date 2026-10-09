import type { MetadataRoute } from "next";

import { blogPostList } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

/**
 * Only list pages that should rank. The HTML /sitemap page is noindex, so it
 * is intentionally left out.
 *
 * `lastModified` is omitted for static pages on purpose: stamping every URL
 * with the build time makes Google distrust the field. Add a real date here
 * only when that page's content actually changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    {
      path: "products/organic-hair-oil-best-seller",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
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

  const blogEntries: MetadataRoute.Sitemap = blogPostList.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}

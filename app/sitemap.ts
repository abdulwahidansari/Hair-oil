import type { MetadataRoute } from "next";

import { blogPostList } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    { path: "sitemap", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: path ? `${siteUrl}/${path}` : siteUrl,
      lastModified: now,
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

import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coelegance.store";

export const siteName = "CoElegance Organic Herbal Hair Oil";

function resolvePagePath(path: string): string {
  return !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
}

function resolveTitleString(title: Metadata["title"]): string | undefined {
  if (typeof title === "string") {
    return title;
  }

  if (title && "absolute" in title && title.absolute) {
    return title.absolute;
  }

  if (title && "default" in title && title.default) {
    return title.default;
  }

  return undefined;
}

type PageMetadataOptions = {
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: string[];
};

/** Builds per-route SEO metadata with self-referencing canonical and openGraph URLs. */
export function pageMetadata(
  path: string,
  metadata: Metadata,
  options: PageMetadataOptions = {},
): Metadata {
  const pagePath = resolvePagePath(path);
  const titleString = resolveTitleString(metadata.title);
  const descriptionString =
    typeof metadata.description === "string" ? metadata.description : undefined;

  const openGraphImages = options.images?.map((image) => ({ url: image }));

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: pagePath,
    },
    openGraph: {
      ...metadata.openGraph,
      url: pagePath,
      siteName,
      locale: "en_PK",
      type: options.openGraphType ?? "website",
      ...(titleString ? { title: titleString } : {}),
      ...(descriptionString ? { description: descriptionString } : {}),
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
  };
}

/**
 * Metadata for utility pages (checkout, thank-you) that must not appear in search results.
 * Uses noindex + follow, and omits canonical to avoid mixed indexing signals.
 */
export function privatePageMetadata(path: string, metadata: Metadata): Metadata {
  const pagePath = resolvePagePath(path);
  const titleString = resolveTitleString(metadata.title);
  const descriptionString =
    typeof metadata.description === "string" ? metadata.description : undefined;

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      url: pagePath,
      siteName,
      locale: "en_PK",
      type: "website",
      ...(titleString ? { title: titleString } : {}),
      ...(descriptionString ? { description: descriptionString } : {}),
    },
  };
}

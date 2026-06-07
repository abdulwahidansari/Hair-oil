import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coelegance.store";

function resolvePagePath(path: string): string {
  return !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
}

/** Returns self-referencing canonical and openGraph URL metadata for a route path. */
export function canonicalFor(
  path: string,
): Pick<Metadata, "alternates" | "openGraph"> {
  const pagePath = resolvePagePath(path);

  return {
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      url: pagePath,
    },
  };
}

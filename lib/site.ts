import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coelegance.store";

/** Returns self-referencing canonical metadata for a route path. */
export function canonicalFor(path: string): Pick<Metadata, "alternates"> {
  const canonicalPath =
    !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  return {
    alternates: {
      canonical: canonicalPath,
    },
  };
}

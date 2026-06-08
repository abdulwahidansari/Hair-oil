import { siteUrl } from "@/lib/site";

export const FEATURED_PRODUCT = {
  slug: "coelegance-organic-hair-oil-best-seller",
  name: "CoElegance Organic Herbal Hair Oil 200ml",
  description:
    "Buy CoElegance Organic Herbal Hair Oil 200ml in Pakistan. Herbal formula for hair fall control, stronger roots, dandruff care, and shinier hair.",
  price: 1500,
  compareAtPrice: 2000,
  currency: "PKR",
  sku: "COELEGANCE-HAIR-OIL-200ML",
  images: ["/images/bottel.png", "/images/bottel1.png", "/images/main.png"],
} as const;

export function productPath(): string {
  return `/products/${FEATURED_PRODUCT.slug}`;
}

export function productUrl(): string {
  return `${siteUrl}${productPath()}`;
}

export function absoluteImageUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

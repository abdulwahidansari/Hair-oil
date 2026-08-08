import { siteUrl } from "@/lib/site";

/** Former product slug — permanently redirected in next.config.js (301). */
export const LEGACY_PRODUCT_SLUG = "coelegance-organic-hair-oil-best-seller";

export const FEATURED_PRODUCT = {
  slug: "organic-hair-oil-best-seller",
  name: "CoElegance Organic Herbal Hair Oil 200ml",
  description:
    "Buy CoElegance Organic Herbal Hair Oil 200ml in Pakistan. Herbal formula for hair fall control, stronger roots, dandruff care, and shinier hair.",
  price: 1500,
  compareAtPrice: 2000,
  currency: "PKR",
  sku: "COELEGANCE-HAIR-OIL-200ML",
  images: ["/images/bottel.png", "/images/bottel1.png", "/images/main.png"],
} as const;

export type CatalogProduct = {
  id: number;
  image: { src: string; alt: string };
  rating: number;
  name: string;
  price: number;
  description: string;
};

/** Catalog card data for sliders and shop grids. */
export const catalogProducts: CatalogProduct[] = [
  {
    id: 1,
    image: {
      src: FEATURED_PRODUCT.images[0],
      alt: "CoElegance Organic Herbal Hair Oil 200ml",
    },
    rating: 5,
    name: FEATURED_PRODUCT.name,
    price: FEATURED_PRODUCT.price,
    description: FEATURED_PRODUCT.description,
  },
];

/** API product payload (replaces legacy headphone demo catalog). */
export const apiProducts = [
  {
    id: FEATURED_PRODUCT.sku,
    name: FEATURED_PRODUCT.name,
    categories: ["Organic Hair Oil", "Herbal Hair Care", "Hair Growth"],
    description: FEATURED_PRODUCT.description,
    price: FEATURED_PRODUCT.price,
    rating: 5,
    variants: [
      {
        name: "200ml",
        image: {
          src: FEATURED_PRODUCT.images[0],
          alt: FEATURED_PRODUCT.name,
        },
      },
    ],
    images: FEATURED_PRODUCT.images,
    tabs: {
      additionalInfo: {
        details: [
          "100% herbal formula with 20+ natural ingredients",
          "Reduces hair fall and strengthens roots",
          "Suitable for all hair types",
        ],
        specifications: [],
      },
      reviews: [],
    },
  },
];

export function productPath(): string {
  return `/products/${FEATURED_PRODUCT.slug}`;
}

export function productUrl(): string {
  return `${siteUrl}${productPath()}`;
}

export function productSchemaId(): string {
  return `${productUrl()}#product`;
}

export function absoluteImageUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

import { CURRENCY, getProduct, productHref } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

/** Former product slug — permanently redirected in next.config.js (301). */
export const LEGACY_PRODUCT_SLUG = "coelegance-organic-hair-oil-best-seller";

/** The store's flagship product (used on the homepage and in site-wide schema). */
export const FEATURED_PRODUCT_SLUG = "organic-hair-oil-best-seller";

const featured = getProduct(FEATURED_PRODUCT_SLUG);

if (!featured || typeof featured.price !== "number") {
  throw new Error(
    `Featured product "${FEATURED_PRODUCT_SLUG}" must exist in lib/catalog.ts and have a price`,
  );
}

export const FEATURED_PRODUCT = {
  slug: featured.slug,
  name: featured.name,
  description: featured.metaDescription,
  price: featured.price,
  compareAtPrice: featured.compareAtPrice ?? featured.price,
  currency: CURRENCY,
  sku: featured.sku,
  images: featured.images.map((image) => image.src),
};

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

/** Path of a product page. Defaults to the featured product. */
export function productPath(slug: string = FEATURED_PRODUCT_SLUG): string {
  return productHref(slug);
}

export function productUrl(slug: string = FEATURED_PRODUCT_SLUG): string {
  return `${siteUrl}${productPath(slug)}`;
}

export function productSchemaId(slug: string = FEATURED_PRODUCT_SLUG): string {
  return `${productUrl(slug)}#product`;
}

/** Absolute URL for an image path. Spaces and other characters are encoded. */
export function absoluteImageUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteUrl}${encodeURI(path)}`;
}

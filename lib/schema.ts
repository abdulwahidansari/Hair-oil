import type { BlogPost } from "@/lib/blog-posts";
import { toIsoDateTime } from "@/lib/blog-posts";
import type { FaqItem } from "@/lib/faq";
import { homepageFaqs } from "@/lib/faq";
import {
  CURRENCY,
  SHIPPING_FEE,
  categoryTrail,
  collectionHref,
  getPublishedProduct,
  isPurchasable,
  productHref,
  type Category,
  type Product,
} from "@/lib/catalog";
import {
  absoluteImageUrl,
  FEATURED_PRODUCT_SLUG,
  productSchemaId,
  productUrl,
} from "@/lib/product";
import { siteUrl } from "@/lib/site";
import type { Testimonial } from "@/lib/testimonials";
import { featuredTestimonial, testimonials } from "@/lib/testimonials";

export const ORGANIZATION_ID = `${siteUrl}/#organization`;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function absoluteUrl(path: string): string {
  if (!path || path === "/") {
    return siteUrl;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function schemaGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "CoElegance",
    alternateName: "Organic Hair Oil",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    email: "coeleganceintl@gmail.com",
    telephone: "+923071123512",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61587810810965",
      "https://www.instagram.com/coelegance.store/",
      "https://www.youtube.com/@Coelegance",
      "https://www.pinterest.com/coelegance/",
      "https://www.tiktok.com/@coeleganceintl",
    ],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function reviewSchema(
  testimonial: Testimonial,
  itemReviewedId?: string,
): Record<string, unknown> {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.author,
    },
    datePublished: testimonial.datePublished,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(testimonial.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: testimonial.quote,
    ...(itemReviewedId
      ? {
          itemReviewed: {
            "@id": itemReviewedId,
          },
        }
      : {}),
  };
}

export function aggregateRatingSchema(
  reviewCount: number,
  ratingValue = 5,
): Record<string, unknown> {
  return {
    "@type": "AggregateRating",
    ratingValue: String(ratingValue),
    reviewCount: String(reviewCount),
    bestRating: "5",
    worstRating: "1",
  };
}

/** Average of the reviews actually shown on the site, rounded to one decimal. */
function averageTestimonialRating(): number {
  if (testimonials.length === 0) {
    return 0;
  }

  const total = testimonials.reduce((sum, item) => sum + item.rating, 0);
  return Math.round((total / testimonials.length) * 10) / 10;
}

export function merchantReturnPolicySchema(): Record<string, unknown> {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "PK",
    // Mirrors /refund: replacement only for damaged or wrong items, reported within 24 hours.
    // If the policy on that page changes, change this block to match.
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    itemCondition: "https://schema.org/DamagedCondition",
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    merchantReturnLink: `${siteUrl}/refund`,
  };
}

export function shippingDetailsSchema(): Record<string, unknown> {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: String(SHIPPING_FEE),
      currency: CURRENCY,
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "PK",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 2,
        maxValue: 7,
        unitCode: "DAY",
      },
    },
  };
}

function featuredProduct(): Product {
  const product = getPublishedProduct(FEATURED_PRODUCT_SLUG);

  if (!product) {
    throw new Error(`Featured product "${FEATURED_PRODUCT_SLUG}" must be published.`);
  }

  return product;
}

export function productSchema(
  product: Product = featuredProduct(),
): Record<string, unknown> {
  const url = productUrl(product.slug);

  return {
    "@type": "Product",
    "@id": productSchemaId(product.slug),
    url,
    name: product.name,
    description: product.metaDescription,
    image: product.images.map((image) => absoluteImageUrl(image.src)),
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "CoElegance",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: CURRENCY,
      price: String(product.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": ORGANIZATION_ID,
      },
      hasMerchantReturnPolicy: merchantReturnPolicySchema(),
      shippingDetails: shippingDetailsSchema(),
    },
    // Ratings are only published for products whose reviews are shown on the site.
    ...(product.showReviews && testimonials.length > 0
      ? {
          aggregateRating: aggregateRatingSchema(
            testimonials.length,
            averageTestimonialRating(),
          ),
        }
      : {}),
  };
}

export function blogPostingSchema(post: BlogPost): Record<string, unknown> {
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteImageUrl(post.image),
    datePublished: toIsoDateTime(post.publishedAt),
    dateModified: toIsoDateTime(post.modifiedAt),
    author: {
      "@id": ORGANIZATION_ID,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function homepageSchemaGraph(): Record<string, unknown> {
  return schemaGraph(
    organizationSchema(),
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "CoElegance Organic Herbal Hair Oil — Best Hair Oil in Pakistan",
      description:
        "CoElegance organic herbal hair oil reduces hair fall, strengthens roots and supports natural hair growth. Cash on delivery across Pakistan.",
      isPartOf: { "@id": ORGANIZATION_ID },
      about: { "@id": productSchemaId() },
      inLanguage: "en-PK",
    },
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    productSchema(),
    faqPageSchema(homepageFaqs),
    reviewSchema(featuredTestimonial, productSchemaId()),
  );
}

export function productPageSchemaGraph(product: Product): Record<string, unknown> {
  // "Coming soon" products have no price or offer yet, so they get no Product markup.
  const live = isPurchasable(product);
  const firstCategory = product.categories[0];
  const categoryCrumbs: BreadcrumbItem[] = firstCategory
    ? categoryTrail(firstCategory).map((category) => ({
        name: category.name,
        path: collectionHref(category.slug),
      }))
    : [];

  return schemaGraph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      ...categoryCrumbs,
      { name: product.name, path: productHref(product.slug) },
    ]),
    ...(live ? [productSchema(product)] : []),
    ...(live && product.showReviews
      ? [reviewSchema(featuredTestimonial, productSchemaId(product.slug))]
      : []),
    ...(live && product.faqs && product.faqs.length > 0
      ? [faqPageSchema(product.faqs)]
      : []),
  );
}

/** Schema for /shop and /collections/[slug]: breadcrumb plus a list of products. */
export function collectionSchemaGraph(
  title: string,
  path: string,
  items: Product[],
  category?: Category,
): Record<string, unknown> {
  const crumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];

  if (category) {
    crumbs.push({ name: "Shop", path: "/shop" });
    categoryTrail(category.slug).forEach((item) => {
      crumbs.push({ name: item.name, path: collectionHref(item.slug) });
    });
  } else {
    crumbs.push({ name: title, path });
  }

  return schemaGraph(
    organizationSchema(),
    breadcrumbSchema(crumbs),
    {
      "@type": "ItemList",
      name: title,
      itemListElement: items.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: productUrl(product.slug),
        name: product.name,
      })),
    },
  );
}

export function breadcrumbPageSchemaGraph(
  breadcrumbs: BreadcrumbItem[],
): Record<string, unknown> {
  return schemaGraph(breadcrumbSchema(breadcrumbs));
}

export function blogPostSchemaGraph(post: BlogPost): Record<string, unknown> {
  return schemaGraph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    blogPostingSchema(post),
  );
}

export function blogIndexSchemaGraph(): Record<string, unknown> {
  return schemaGraph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  );
}

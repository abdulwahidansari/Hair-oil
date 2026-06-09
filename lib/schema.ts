import type { BlogPost } from "@/lib/blog-posts";
import { toIsoDateTime } from "@/lib/blog-posts";
import type { FaqItem } from "@/lib/faq";
import { homepageFaqs, productFaqs } from "@/lib/faq";
import {
  absoluteImageUrl,
  FEATURED_PRODUCT,
  productPath,
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
    alternateName: "CoElegance Organic Herbal Hair Oil",
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

export function merchantReturnPolicySchema(): Record<string, unknown> {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "PK",
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
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
      value: "0",
      currency: FEATURED_PRODUCT.currency,
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

export function productSchema(): Record<string, unknown> {
  const url = productUrl();
  const id = productSchemaId();

  return {
    "@type": "Product",
    "@id": id,
    url,
    name: FEATURED_PRODUCT.name,
    description: FEATURED_PRODUCT.description,
    image: FEATURED_PRODUCT.images.map(absoluteImageUrl),
    sku: FEATURED_PRODUCT.sku,
    brand: {
      "@type": "Brand",
      name: "CoElegance",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: FEATURED_PRODUCT.currency,
      price: String(FEATURED_PRODUCT.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2026-12-31",
      seller: {
        "@id": ORGANIZATION_ID,
      },
      hasMerchantReturnPolicy: merchantReturnPolicySchema(),
      shippingDetails: shippingDetailsSchema(),
    },
    aggregateRating: aggregateRatingSchema(testimonials.length),
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
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    productSchema(),
    faqPageSchema(homepageFaqs),
    reviewSchema(featuredTestimonial, productSchemaId()),
  );
}

export function productPageSchemaGraph(): Record<string, unknown> {
  return schemaGraph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: FEATURED_PRODUCT.name, path: productPath() },
    ]),
    productSchema(),
    reviewSchema(featuredTestimonial, productSchemaId()),
    faqPageSchema(productFaqs),
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

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductCard } from "@/components/shop/product-card";
import { ProductPurchase } from "@/components/shop/product-purchase";
import {
  categoryTrail,
  collectionHref,
  formatPKR,
  getCategory,
  getProduct,
  isPurchasable,
  PRODUCTS,
  productHref,
  relatedProducts,
  type Product,
} from "@/lib/catalog";
import { productPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Heading from "@/ui/head";

const WHATSAPP_NUMBER = "923071123512";

type ProductPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.slug);

  if (!product) {
    return {};
  }

  const live = isPurchasable(product);
  const base = pageMetadata(
    productHref(product),
    { title: { absolute: product.metaTitle }, description: product.metaDescription },
    live && product.images[0] ? { images: [product.images[0].src] } : {},
  );

  // Products that are not on sale yet stay out of search results until they launch.
  return live ? base : { ...base, robots: { index: false, follow: true } };
}

type DetailSection = { id: string; title: string; content: React.ReactNode };

function detailSections(product: Product): DetailSection[] {
  const sections: DetailSection[] = [];

  if (product.benefits && product.benefits.length > 0) {
    sections.push({
      id: "benefits",
      title: "Benefits",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          {product.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    });
  }

  if (product.usage && product.usage.length > 0) {
    sections.push({
      id: "usage",
      title: "Usage",
      content: (
        <ul className="list-disc space-y-2 pl-5">
          {product.usage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    });
  }

  if (product.ingredients) {
    sections.push({
      id: "ingredients",
      title: "Ingredients",
      content: <p>{product.ingredients}</p>,
    });
  }

  return sections;
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const live = isPurchasable(product);
  const price = product.price ?? 0;
  const compareAt = product.compareAtPrice ?? 0;
  const savings = live && compareAt > price ? compareAt - price : 0;
  const firstCategory = product.categories[0] ? getCategory(product.categories[0]) : undefined;
  const trail = firstCategory ? categoryTrail(firstCategory.slug) : [];
  const sections = detailSections(product);
  const related = relatedProducts(product, 4);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Assalam o alaikum! Please let me know when ${product.name} is available.`,
  )}`;

  return (
    <>
      <JsonLd data={productPageSchemaGraph(product)} />
      <SectionLayout bg="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6b7280]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/shop" className="hover:text-black">
                  Shop
                </Link>
              </li>
              {trail.map((item) => (
                <li key={item.slug} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={collectionHref(item)} className="hover:text-black">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-start lg:gap-10 lg:px-8 lg:py-12 xl:gap-12">
          <div className="min-w-0 w-full lg:sticky lg:top-24 lg:z-10 lg:w-1/2 lg:self-start">
            <ProductImageGallery
              images={product.images}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm"
            />
          </div>

          <div className="flex min-w-0 w-full flex-col space-y-6 lg:w-1/2 lg:space-y-7">
            <header className="space-y-3">
              <Heading
                as="h1"
                intent="shop-page"
                className="text-2xl font-semibold leading-tight tracking-tight text-[#111827] sm:text-3xl lg:text-[2rem] xl:text-4xl"
              >
                {product.name}
              </Heading>
              <p className="text-sm text-[#6b7280] sm:text-base">
                {product.size ? `${product.size} · ` : ""}Cash on delivery across Pakistan
              </p>

              {live ? (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-2xl font-semibold tabular-nums text-[#111827] sm:text-3xl">
                    {formatPKR(price)}
                  </p>
                  {savings > 0 && (
                    <>
                      <p className="text-sm tabular-nums text-[#9ca3af] line-through sm:text-base">
                        {formatPKR(compareAt)}
                      </p>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Save {formatPKR(savings)}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <p>
                  <span className="rounded-full bg-[#2d5a3d] px-3 py-1 text-xs font-semibold text-white">
                    Coming soon
                  </span>
                </p>
              )}
            </header>

            <div className="max-w-prose space-y-4 text-[15px] leading-relaxed text-[#4b5563] sm:text-base">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {live ? (
              <ProductPurchase slug={product.slug} price={price} />
            ) : (
              <div className="space-y-3 rounded-2xl bg-[#fdf7ef] p-5">
                <p className="text-sm text-[#4b5563]">
                  This product isn&apos;t available to order yet. Message us on WhatsApp and
                  we&apos;ll let you know as soon as it launches.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
                >
                  Notify me on WhatsApp
                </a>
              </div>
            )}

            {/*
              Native <details> keeps these sections in the server-rendered HTML (collapsed
              visually, not removed), so search engines and AI crawlers can read them.
            */}
            {sections.length > 0 && (
              <div className="w-full border-t border-gray-200 pt-1">
                {sections.map((section) => (
                  <details key={section.id} className="group border-b border-gray-200">
                    <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-gray-50/80 [&::-webkit-details-marker]:hidden">
                      <span className="text-base font-medium text-[#111827]">{section.title}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-[#111827] transition-transform duration-300 ease-out group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="pb-4 text-sm leading-relaxed text-[#4b5563]">
                      {section.content}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shown whenever the product page also outputs FAQPage markup (live products only). */}
        {live && product.faqs && product.faqs.length > 0 && (
          <FaqSection faqs={product.faqs} id="product-faq" />
        )}

        {related.length > 0 && (
          <section
            aria-labelledby="related-products"
            className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8"
          >
            <h2 id="related-products" className="mb-5 text-xl font-semibold text-[#111827]">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </SectionLayout>
    </>
  );
}

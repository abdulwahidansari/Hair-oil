import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/shop/product-card";
import {
  CATEGORIES,
  categoryTrail,
  childCategories,
  collectionHref,
  getCategory,
  isPurchasable,
  productsInCategory,
} from "@/lib/catalog";
import { collectionSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Heading from "@/ui/head";

type CollectionPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const category = getCategory(params.slug);

  if (!category) {
    return {};
  }

  const orderable = productsInCategory(category.slug).filter(isPurchasable);
  const firstImage = orderable[0]?.images[0]?.src;

  const base = pageMetadata(
    collectionHref(category),
    {
      title: { absolute: category.metaTitle },
      description: category.metaDescription,
    },
    firstImage ? { images: [firstImage] } : {},
  );

  // A collection with nothing orderable yet stays out of search results until it has products.
  return orderable.length > 0 ? base : { ...base, robots: { index: false, follow: true } };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const category = getCategory(params.slug);

  if (!category) {
    notFound();
  }

  const products = productsInCategory(category.slug);
  const subCategories = childCategories(category.slug);
  const trail = categoryTrail(category.slug);

  return (
    <>
      <JsonLd
        data={collectionSchemaGraph(
          category.name,
          collectionHref(category),
          products.filter(isPurchasable),
          category,
        )}
      />
      <SectionLayout className="px-4 py-10 md:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#6b7280]">
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
            {trail.map((item, index) => (
              <li key={item.slug} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {index === trail.length - 1 ? (
                  <span aria-current="page" className="text-[#111827]">
                    {item.name}
                  </span>
                ) : (
                  <Link href={collectionHref(item)} className="hover:text-black">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mb-8 space-y-3">
          <Heading as="h1" intent="shop-page" className="text-3xl md:text-4xl lg:text-5xl">
            {category.name}
          </Heading>
          <p className="max-w-2xl text-sm text-[#4b5563] md:text-base">
            {category.description}
          </p>
          {subCategories.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-2">
              {subCategories.map((child) => (
                <li key={child.slug}>
                  <Link
                    href={collectionHref(child)}
                    className="inline-flex rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-[#111827] hover:border-black"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="pt-1 text-xs text-[#6b7280]">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-[#f9fafb] p-8 text-center text-sm text-[#4b5563]">
            New products are coming to this collection soon.
          </p>
        )}
      </SectionLayout>
    </>
  );
}

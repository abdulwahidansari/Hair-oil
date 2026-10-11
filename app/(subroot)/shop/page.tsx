import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/shop/product-card";
import {
  CATEGORIES,
  collectionHref,
  productsInCategory,
  searchProducts,
} from "@/lib/catalog";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Heading from "@/ui/head";

type ShopPageProps = { searchParams?: { q?: string | string[] } };

function readQuery(searchParams: ShopPageProps["searchParams"]): string {
  const raw = searchParams?.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").slice(0, 80).trim();
}

export function generateMetadata({ searchParams }: ShopPageProps): Metadata {
  const base = pageMetadata(
    "/shop",
    {
      title: { absolute: "Shop CoElegance – Hair Oil & Shampoos in Pakistan" },
      description:
        "Shop CoElegance hair care: herbal hair oil and shampoos made in Pakistan. Cash on delivery nationwide.",
    },
    { images: ["/images/bottel.png"] },
  );

  // Search result pages should not be indexed; the canonical points to /shop.
  return readQuery(searchParams) ? { ...base, robots: { index: false, follow: true } } : base;
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const query = readQuery(searchParams);
  const products = searchProducts(query);

  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      <SectionLayout className="px-4 py-10 md:px-8 lg:px-12">
        <header className="mb-8 space-y-3">
          <Heading as="h1" intent="shop-page" className="text-3xl md:text-4xl lg:text-5xl">
            {query ? `Search results for “${query}”` : "Shop"}
          </Heading>
          <p className="max-w-2xl text-sm text-[#4b5563] md:text-base">
            {query
              ? `${products.length} product${products.length === 1 ? "" : "s"} found.`
              : "Herbal hair care made in Pakistan. Cash on delivery nationwide."}
          </p>
        </header>

        {!query && (
          <section aria-labelledby="shop-by-category" className="mb-10">
            <h2 id="shop-by-category" className="mb-4 text-lg font-semibold text-[#111827]">
              Shop by category
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={collectionHref(category)}
                    className="block h-full rounded-xl border border-gray-200 bg-[#fdf7ef] p-5 transition-colors hover:border-black"
                  >
                    <span className="block text-base font-semibold text-[#21411f]">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-sm text-[#5b6b5a]">
                      {category.description}
                    </span>
                    <span className="mt-3 block text-xs font-medium text-[#6b7280]">
                      {productsInCategory(category.slug).length} products
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-label={query ? "Search results" : "All products"}>
          {!query && (
            <h2 className="mb-4 text-lg font-semibold text-[#111827]">All products</h2>
          )}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-[#f9fafb] p-8 text-center text-sm text-[#4b5563]">
              <p>We couldn&apos;t find anything for “{query}”.</p>
              <p className="mt-2">
                <Link href="/shop" className="font-semibold text-black underline">
                  See all products
                </Link>
              </p>
            </div>
          )}
        </section>
      </SectionLayout>
    </>
  );
}

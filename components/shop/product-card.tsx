import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import {
  formatPKR,
  isPurchasable,
  productHref,
  type Product,
} from "@/lib/catalog";

/** Product tile used on the shop page, collection pages and "you may also like". */
export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const purchasable = isPurchasable(product);
  const onSale =
    purchasable &&
    typeof product.price === "number" &&
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;
  const percentOff =
    onSale && product.price && product.compareAtPrice
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={productHref(product)}
        className="relative block aspect-square bg-[#faf4e8]"
        aria-label={product.name}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-[#d4735e] px-2.5 py-1 text-xs font-semibold text-white">
            {percentOff}% off
          </span>
        )}
        {!purchasable && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2d5a3d] px-2.5 py-1 text-xs font-semibold text-white">
            Coming soon
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[#c7994b]">
          {product.tagline}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-[#111827] md:text-base">
          <Link href={productHref(product)} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto space-y-3 pt-2">
          {purchasable && typeof product.price === "number" ? (
            <>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-base font-semibold text-[#111827]">
                  {formatPKR(product.price)}
                </span>
                {onSale && typeof product.compareAtPrice === "number" && (
                  <span className="text-sm text-[#9ca3af] line-through">
                    {formatPKR(product.compareAtPrice)}
                  </span>
                )}
              </p>
              <AddToCartButton slug={product.slug} />
            </>
          ) : (
            <Link
              href={productHref(product)}
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 px-4 py-2.5 text-sm font-semibold text-[#111827] hover:border-black"
            >
              View details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

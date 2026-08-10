import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { blogPostList } from "@/lib/blog-posts";
import { blogIndexSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMetadata(
  "/blog",
  {
    title: "Hair Care Tips & Guides",
    description:
      "Expert hair care tips from CoElegance Pakistan — reduce hair fall, grow thicker hair, and care for your scalp with organic herbal oils.",
  },
  {
    images: ["/images/bottel.png"],
    twitterCard: "summary_large_image",
  },
);

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogIndexSchemaGraph()} />
    <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 md:text-3xl">
        Hair Care Tips &amp; Guides
      </h1>

      <div className="space-y-12 md:space-y-16">
        {blogPostList.map((post) => (
          <article
            key={post.slug}
            className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <div className="flex flex-col justify-center">
              <time
                className="mb-2 text-sm text-gray-500"
                dateTime={post.publishedAt}
              >
                {post.date}
              </time>
              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-gray-700 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mb-6 text-gray-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex w-fit items-center border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
    </>
  );
}

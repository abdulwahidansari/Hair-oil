import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts, getBlogPost, toIsoDateTime } from "@/lib/blog-posts";
import { blogPostSchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const coverImage = post.image || "/images/bottel.png";

  return pageMetadata(
    `/blog/${post.slug}`,
    {
      title: {
        absolute: `${post.title} | CoElegance Hair Care Blog`,
      },
      description: post.excerpt,
    },
    {
      openGraphType: "article",
      publishedTime: toIsoDateTime(post.publishedAt),
      modifiedTime: toIsoDateTime(post.modifiedAt),
      images: [coverImage],
      twitterCard: "summary_large_image",
      authors: ["CoElegance Editorial"],
    },
  );
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={blogPostSchemaGraph(post)} />
      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            ← Back to Blog
          </Link>
        </nav>

        <header className="mb-12">
          <div className="mb-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {post.title}
          </h1>

          <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
            {post.date}
          </time>
        </header>

        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-6 leading-relaxed text-gray-700"
          />
        </article>

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center border border-gray-300 px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            ← Back to All Posts
          </Link>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

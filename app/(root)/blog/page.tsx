import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Care Blog",
  description:
    "Read CoElegance hair care tips and herbal wellness guides for healthier scalp care, reduced hair fall, and stronger hair growth.",
};

// Sample blog data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "Ramadan: Maintaining Health and Wellness During Fasting",
    date: "March 7, 2025",
    image: "/images/blog/ramadan-wellness.jpg",
    excerpt: "Ramadan and fasting offer a valuable opportunity to slow down and reset both body and mind. Learn essential tips for maintaining physical well-being, proper hydration, and healthy nutrition during the holy month.",
    slug: "ramadan-health-wellness"
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold uppercase tracking-wider text-gray-800 md:mb-12 md:text-3xl">
        NEWS
      </h1>
      
      <div className="space-y-12 md:space-y-16">
        {blogPosts.map((post) => (
          <article key={post.id} className="group">
            <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] md:gap-8">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500" dateTime={post.date}>
                  {post.date}
                </time>
                <p className="text-gray-600">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex w-fit items-center border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
} 
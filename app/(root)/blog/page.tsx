import Image from "next/image";
import Link from "next/link";

// Sample blog data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "TEST 2",
    date: "February 15, 2024",
    image: "/images/blog/test2.jpg",
    excerpt: "Lorem ipsum sit dolor amet is a dummy text used in typing out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    slug: "test-2"
  },
  {
    id: 2,
    title: "Test",
    date: "February 15, 2024",
    image: "/images/blog/test1.jpg",
    excerpt: "Lorem ipsum sit dolor amet is a dummy text used in typing out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    slug: "test-1"
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
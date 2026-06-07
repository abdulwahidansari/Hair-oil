import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalFor } from "@/lib/site";

// Blog post data - in a real app, this would come from an API or CMS
const blogPosts = {
  "ramadan-health-wellness": {
    id: 1,
    title: "Ramadan: Maintaining Health and Wellness During Fasting",
    date: "March 7, 2025",
    image: "/images/blog/ramadan-wellness.jpg",
    content: `
      <h2>Ramadan and Fasting: A Time for Reset</h2>
      
      <p>Ramadan and fasting offer a valuable opportunity to slow down and reset both body and mind. It is a time for reflection, rejuvenation, and detoxification. While the spiritual goals of the holy month are central, maintaining physical well-being is equally important to fully benefit from this period of worship and discipline.</p>
      
      <p>When Ramadan falls during the hot months, fasting can become physically demanding, particularly because the body goes long hours without water. Dehydration can affect overall health and may also take a toll on the skin. Therefore, it is important not only to focus on prayer and spiritual growth but also to maintain proper nutrition, hydration, and rest. A balanced lifestyle during Ramadan helps sustain energy levels and keeps the body healthy throughout the month.</p>
      
      <h2>Tips for Maintaining Health and Skin During Ramadan</h2>
      
      <h3>Get Plenty of Sleep</h3>
      
      <p>Adequate sleep is essential for maintaining physical and mental balance during Ramadan. Try to ensure at least seven hours of sleep each day. A practical routine is to sleep soon after Isha prayers and then rest again after Suhoor (Sehri) if possible.</p>
      
      <p>The body's natural sleep cycle functions best at night. Daytime sleep cannot fully replace nighttime rest, so maintaining a consistent sleep schedule helps the body recover and remain energized throughout the fasting period.</p>
      
      <h3>Hydrate Properly</h3>
      
      <p>Hydration is extremely important, especially during hot weather. Water plays a vital role in maintaining body functions, improving skin health, and preventing fatigue.</p>
      
      <p>On average, adults should aim to drink about 14–16 glasses of water daily. During Ramadan, this intake should be distributed between Iftar and Suhoor. Instead of drinking large amounts all at once at Iftar, it is better to drink water slowly throughout the evening.</p>
      
      <p>It is also beneficial to start Suhoor with a glass of water on an empty stomach to support digestion and hydration before the fast begins.</p>
      
      <p>Proper hydration also supports the body's natural detox process. The lymphatic system helps remove toxins and waste from the body, and adequate water intake makes this process more efficient.</p>
      
      <h3>Choose Healthy Foods</h3>
      
      <p>Ramadan is about fasting and self-discipline, not overeating. At Iftar, it is common to crave fried snacks such as samosas or sugary beverages, but relying heavily on these foods can lead to fatigue, dehydration, and digestive discomfort.</p>
      
      <p>Instead, try to choose balanced and nutritious meals. A healthy diet during Ramadan helps maintain energy levels, reduces thirst during the next day's fast, and supports overall well-being.</p>
      
      <p>At Suhoor, include foods rich in protein and complex carbohydrates, such as eggs, whole grains, yogurt, and fruits. These foods digest slowly and help keep you full and energized during the fasting hours.</p>
      
      <p>At Iftar, focus on foods that contain fiber and antioxidants. Fruits, vegetables, and whole foods help repair and protect the skin while supporting the body's natural recovery after a long day of fasting.</p>
      
      <h3>Don't Forget the Dates</h3>
      
      <p>Breaking the fast with dates is not only a beautiful tradition but also a recommended practice in the Sunnah.</p>
      
      <p>Dates are rich in antioxidants, vitamins, and minerals including zinc, calcium, vitamin A, and iron. They help quickly restore energy levels after fasting and support digestion when the body has gone many hours without food.</p>
      
      <p>Including dates at Iftar is therefore both spiritually meaningful and nutritionally beneficial.</p>
      
      <h2>Conclusion</h2>
      
      <p>Maintaining health during Ramadan is about balance and mindfulness. By prioritizing proper sleep, hydration, and nutrition, you can ensure that your body remains strong and healthy while you focus on the spiritual aspects of this blessed month. Remember that taking care of your physical health enables you to better fulfill your religious duties and fully benefit from the transformative experience of Ramadan.</p>
    `
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.title,
    ...canonicalFor(`/blog/${params.slug}`),
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link 
          href="/blog" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back to Blog
        </Link>
      </nav>

      {/* Article Header */}
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
        
        <time className="text-sm text-gray-500" dateTime={post.date}>
          {post.date}
        </time>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="space-y-6 text-gray-700 leading-relaxed"
        />
      </article>

      {/* Back to Blog */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center border border-gray-300 px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          ← Back to All Posts
        </Link>
      </div>
    </main>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

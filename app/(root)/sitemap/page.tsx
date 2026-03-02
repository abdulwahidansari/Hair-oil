import Link from "next/link";

const sitemapData = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  {
    title: "Shop",
    links: [
      { name: "All Products", path: "/shop" },
      { name: "Featured Hair Oil", path: "/shop" },
      { name: "Track My Order", path: "/orders/track" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { name: "Terms of Service", path: "/terms" },
      { name: "Refund & Exchange Policy", path: "/refund" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 md:mb-12 md:text-4xl">
        Sitemap
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sitemapData.map((section, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.path}
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          XML Sitemap
        </h2>
        <p className="mb-4 text-gray-600">
          For search engines, you can find our XML sitemap at:{" "}
          <Link
            href="/sitemap.xml"
            className="text-blue-600 hover:text-blue-800"
          >
            sitemap.xml
          </Link>
        </p>
      </div>
    </main>
  );
} 
// package
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// lib
import { cn } from "@/lib/utils";

// css
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coelegance.store";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "CoElegance Organic Herbal Hair Oil",
  url: siteUrl,
  telephone: "+92 213 130284",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.facebook.com/Coeleganceintl/",
    "https://www.instagram.com/coeleganceintl/",
    "https://www.youtube.com/@Coelegance",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CoElegance Organic Herbal Hair Oil | Natural Hair Growth & Scalp Care",
  description:
    "CoElegance Organic Herbal Hair Oil blends rosemary, onion, black seed and botanical oils to reduce hair fall, strengthen roots and support healthy natural hair growth.",
  keywords: [
    "CoElegance",
    "organic hair oil",
    "herbal hair oil",
    "natural hair growth",
    "scalp care",
    "reduce hair fall",
    "rosemary oil",
    "onion oil",
    "black seed oil",
  ],
  openGraph: {
    title:
      "CoElegance Organic Herbal Hair Oil | Natural Hair Growth & Scalp Care",
    description:
      "Strengthen roots, reduce hair fall, and support healthy growth with CoElegance Organic Herbal Hair Oil.",
    url: siteUrl,
    siteName: "CoElegance Organic Herbal Hair Oil",
    type: "website",
    locale: "en_PK",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: [{ url: "/icon", type: "image/svg+xml" }],
    shortcut: "/icon",
    apple: "/icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}

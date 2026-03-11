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
  telephone: "+923071123512",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61587810810965",
    "https://www.instagram.com/coeleganceintl/",
    "https://www.youtube.com/@Coelegance",
    "https://www.pinterest.com/coelegance/",
    "https://www.tiktok.com/@coeleganceintl",
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
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
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
      <head>
        <meta name="facebook-domain-verification" content="vkqsp1jvv2nn9zgwp5kzyct9i9b5h3" />
        
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '770294949152488');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=770294949152488&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
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

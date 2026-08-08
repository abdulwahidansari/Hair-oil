import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import { privatePageMetadata } from "@/lib/site";
import { productPath } from "@/lib/product";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbPageSchemaGraph } from "@/lib/schema";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Button from "@/ui/button";

export const metadata: Metadata = privatePageMetadata("/thank-you", {
  title: "Thank You - CoElegance",
  description:
    "Your CoElegance order has been placed successfully. We will contact you shortly to confirm delivery.",
});

export default function ThankYouPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbPageSchemaGraph([
          { name: "Home", path: "/" },
          { name: "Thank You", path: "/thank-you" },
        ])}
      />
      <Script id="fbq-purchase" strategy="afterInteractive">
        {`if (typeof fbq === "function") { fbq("track", "Purchase"); }`}
      </Script>
      <SectionLayout bg="bg-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center md:py-24">
          <Heading
            as="h1"
            intent="shop-page"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            Thank you for your order!
          </Heading>
          <Text size="sm" className="max-w-xl text-sm text-[#4b5563] md:text-base">
            We&apos;ve received your details and will contact you shortly to confirm
            your CoElegance Organic Herbal Hair Oil order and arrange delivery.
          </Text>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={productPath()}>
              <Button className="rounded-full px-6 py-2.5 text-sm md:text-base">
                Back to product page
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="primary"
                className="rounded-full px-6 py-2.5 text-sm md:text-base"
              >
                Go to homepage
              </Button>
            </Link>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}

// package
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Button from "@/ui/button";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import CatalogSlider from "@/ui/slider/catalogSlider";
import TestimonialsSection from "@/ui/testimonialsSection";
import {
  CallIcon,
  LockIcon,
  MoneyIcon,
} from "@/ui/assets/svg";

const testimonials = [
  {
    quote: `I've never felt better about the products I use on my Hair. CoElegance delivers on its promise of organic, effective Hair oil.!`,
    author: "Bisma Khan",
    location: "Karachi",
  }, {
    quote: `My hair fall reduced within weeks and feels thicker at the roots. CoElegance is now a permanent part of my night routine.`,
    author: "Ayesha Khan",
    location: "Karachi",
  },
  {
    quote: `I love that it&apos;s herbal and still lightweight. My scalp feels calm and my hair looks healthier without feeling greasy.`,
    author: "Sara Malik",
    location: "Lahore",
  },
  {
    quote: `After using CoElegance regularly, my hair feels stronger and breakage has visibly reduced. Highly recommend for damaged hair.`,
    author: "Hamza Ali",
    location: "Islamabad",
  },
];

export const metadata: Metadata = pageMetadata("/", {
  title: "Best Hair Oil for Hair Growth in Pakistan | CoElegance Organic Hair Oil",
  description:
    "Looking for the best hair oil in Pakistan? CoElegance is the best organic hair oil in Pakistan — reduces hair fall, promotes hair growth and strengthens roots. Cash on delivery nationwide.",
});

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <SectionLayout
        bg="bg-[#ffc95c]"
        className="flex flex-col items-center justify-between lg:grid lg:grid-cols-2 lg:pt-8"
      >
        {/* Text content */}
        <div className="flex flex-col items-center gap-4 p-8 sm:max-w-[600px] md:max-w-[600px] md:py-16 lg:order-2 lg:max-w-none lg:items-start lg:p-0">
          <div className="space-y-2 text-center lg:text-left">
            <Heading as="h1" intent="hero-section">
               Healthy hair <br /><span className="text-[#377DFF]">starts</span>{" "}
              with <br /> care.
            </Heading>
            <Text className="md:text-lg lg:text-xl">
              From root to tip refined care
            </Text>
          </div>
          <Link href="/products/coelegance-organic-hair-oil-best-seller">
            <Button fontSize="sm" className="px-14 py-3 md:text-lg">
              Shopping Now
            </Button>
          </Link>
        </div>

        {/* Image content */}
        <div className="flex h-auto w-full items-end justify-center overflow-hidden lg:order-1">
          <Image
            src="/images/main.png"
            width={600}
            height={761}
            alt="Person with healthy, shiny hair"
            className="w-full max-w-[360px] object-cover object-top lg:max-w-[420px] xl:max-w-[460px]"
          />
        </div>
      </SectionLayout>

      {/* Organic highlight section */}
      <SectionLayout bg="bg-[#fdf7ef]">
        <div className="flex flex-col items-center gap-12 px-6 py-16 md:px-10 lg:px-16">
          <div className="max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c7994b]">
              <span className="h-px w-8 bg-[#e3cfa4]" />
              <span>Organic</span>
              <span className="h-px w-8 bg-[#e3cfa4]" />
            </div>

            <Heading
              as="h2"
              intent="base-section"
              className="text-3xl leading-tight text-[#21411f] md:text-4xl lg:text-5xl"
            >
              Why Choose CoElegance Organic Herbal Hair Oil in Pakistan?

            </Heading>

            <Text
              size="sm"
              className="mx-auto max-w-2xl text-sm leading-relaxed text-[#5b6b5a] md:text-base"
            >
              CoElegance Organic Herbal Hair Oil is made in Pakistan for people who want real results without harsh chemicals. Our 100% herbal formulation blends time-tested botanical oils to fight hair fall, strengthen roots & restore natural shine. Do you struggle with dryness, dandruff or slow growth? This oil works with your scalp – not against it.


            </Text>
          </div>

          <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_auto_1.1fr] lg:items-center">
            <div className="space-y-4 text-left lg:text-right">
              <Text
                size="sm"
                weight={600}
                transform="uppercase"
                className="tracking-[0.2em] text-[#c7994b]"
              >
                Nature&apos;s Beauty Secret
              </Text>
              <Heading
                as="h3"
                intent="base-section"
                className="text-xl text-[#21411f] md:text-2xl"
              >
                The Organic Difference
              </Heading>
              <Text
                size="sm"
                className="max-w-sm text-sm leading-relaxed text-[#5b6b5a] md:text-base lg:ml-auto"
              >
                CoElegance is free from mineral oil, parabens, silicones and artificial fragrance, ingredients that block pores and damage hair over time. We buy organic botanical oils from reputable suppliers and cold-press to ensure full potency. All bottles are halal friendly and safe for daily use on all hair types including colour treated hair.
              </Text>
            </div>

            <div className="flex justify-center">
              <div className="relative h-64 w-40 md:h-80 md:w-52 lg:h-96 lg:w-60">
                <Image
                  src="/images/bottel1.png"
                  alt="Organic product"
                  fill
                  sizes="(min-width: 1024px) 240px, 200px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <Text
                  size="sm"
                  weight={600}
                  transform="uppercase"
                  className="tracking-[0.2em] text-[#c7994b]"
                >
                  Nature&apos;s Beauty Secret
                </Text>
                <Heading
                  as="h3"
                  intent="base-section"
                  className="text-xl text-[#21411f] md:text-2xl"
                >
                  Skin Nourishment
                </Heading>
                <Text
                  size="sm"
                  className="max-w-sm text-sm leading-relaxed text-[#5b6b5a] md:text-base"
                >
                  CoElegance Oil is packed with essential fatty acids, vitamins A, D, and E, and herbal actives that penetrate the hair shaft, not just coat it, in every drop. Black seed oil, castor oil and olive oil are the main ingredients that work together to seal split ends, control frizz and promote visibly thicker hair in 4-6 weeks of regular use.


                </Text>
              </div>

              <div className="space-y-4">
                <Text
                  size="sm"
                  weight={600}
                  transform="uppercase"
                  className="tracking-[0.2em] text-[#c7994b]"
                >
                  Beauty with a conscience
                </Text>
                <Heading
                  as="h3"
                  intent="base-section"
                  className="text-xl text-[#21411f] md:text-2xl"
                >
                  Eco-Friendly Practices
                </Heading>
                <Text
                  size="sm"
                  className="max-w-sm text-sm leading-relaxed text-[#5b6b5a] md:text-base"
                >
                  CoElegance is a Pakistani brand founded on sustainability. We use minimal packaging which is recyclable and only work with ethical ingredient suppliers. Our oil is cruelty free, not tested on animals and made in small batches to ensure quality. Support local and shop responsibly by purchasing CoElegance.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Our Best Organic Products section */}
      <SectionLayout>
        <div className="space-y-10 px-6 py-14 md:px-10 lg:px-16">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <div className="inline-flex items-center justify-center gap-2">
              <span className="h-px w-6 flex-1 max-w-12 bg-[#b8d4b4]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4735e]">
                Products
              </span>
              <span className="h-px w-6 flex-1 max-w-12 bg-[#b8d4b4]" />
            </div>
            <Heading
              as="h2"
              intent="base-section"
              className="font-serif text-3xl tracking-tight text-[#2d4a2a] md:text-4xl lg:text-5xl"
            >
              Best Organic Herbal Hair Oil in Pakistan — CoElegance

            </Heading>
            <Text
              size="sm"
              className="text-sm leading-relaxed text-[#6b7280] md:text-base"
            >
Trusted by thousands of customers across Karachi, Lahore, Peshawar, Quetta and Islamabad — CoElegance delivers proven herbal hair care with cash-on-delivery across Pakistan.

            </Text>
          </div>

          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              {/* Left: product image panel */}
              <div className="flex min-h-[280px] items-center justify-center bg-[#faf4e8] p-8 lg:min-h-0">
                <div className="relative h-56 w-40 md:h-72 md:w-48 lg:h-80 lg:w-52">
                  <Image
                    src="/images/bottel.png"
                    alt="Organic product"
                    fill
                    sizes="(min-width: 1024px) 208px, 192px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right: product details */}
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <h3 className="font-sans text-xl font-bold leading-tight text-[#2d4a2a] md:text-2xl lg:text-3xl">
                CoElegance Organic Herbal Hair Oil 200ml | Reduces Hair Fall, Strengthens Roots & Controls Dandruff | All Hair Types
                </h3>
                <Text
                  size="sm"
                  className="mt-4 max-w-xl text-sm leading-relaxed text-[#6b7280] md:text-base"
                >
                  CoElegance Organic Hair Oil is a 100% Herbal & Chemical Free Formula for Pakistani Hair Types. It nourishes the scalp very well, reduces hair fall from the root and helps in faster and thicker hair growth in 4-6 weeks. It is enriched with black seed oil, castor oil and olive oil, all cold pressed and free from mineral oil, parabens and silicones. Lightweight for everyday use. Suitable for coloured, dry, oily and chemically treated hair.
                </Text>
                <ul className="mt-5 max-w-xl space-y-2 text-sm text-[#374151] md:text-base">
                  <li>✓ Reduces hair fall in 2–4 weeks of regular use</li>
                  <li>✓ Strengthens weak, brittle hair from the root</li>
                  <li>✓ Natural anti-dandruff care — no medicated chemicals</li>
                  <li>✓ Seals split ends and controls frizz</li>
                  <li>✓ Halal-friendly | Cruelty-free | No mineral oil</li>
                  <li>✓ Nationwide delivery with COD — Pakistan</li>
                </ul>
                <Text size="sm" className="mt-4 max-w-xl text-sm leading-relaxed text-[#6b7280] md:text-base">
                  <span className="font-semibold text-[#374151]">How to use:</span> Apply 8–10 drops to the scalp. Massage in circular motions for 5 minutes. Leave overnight or for at least 2 hours before washing. Use 2–3 times per week for best results.
                </Text>
                <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/products/coelegance-organic-hair-oil-best-seller">
                    <Button
                      fontSize="sm"
                      className="rounded-xl bg-[#4a5d47] px-6 py-2.5 text-white hover:bg-[#3d4f3b]"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/products/coelegance-organic-hair-oil-best-seller">
                    <Button
                      variant="primary"
                      fontSize="sm"
                      className="rounded-xl bg-[#374151] px-6 py-2.5 hover:bg-[#2d3748]"
                    >
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Testimonials section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Video section */}
      <div className="relative w-full">
        <video
          src="/vedio/1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Features section - 3 cards */}
      <SectionLayout bg="bg-[#f5f5f4]">
        <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3 md:gap-8 lg:px-16 lg:py-14">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:py-12">
            <MoneyIcon className="mb-4 h-12 w-12 text-[#1a1a1a] md:h-14 md:w-14" />
            <h3 className="text-lg font-bold tracking-tight text-[#1a1a1a] md:text-xl">
              Money-back
            </h3>
            <p className="mt-2 text-sm text-[#6b7280] md:text-base">
              30 days guarantee
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:py-12">
            <LockIcon className="mb-4 h-12 w-12 text-[#1a1a1a] md:h-14 md:w-14" />
            <h3 className="text-lg font-bold tracking-tight text-[#1a1a1a] md:text-xl">
              Secure Payments
            </h3>
            <p className="mt-2 text-sm text-[#6b7280] md:text-base">
              COD
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:py-12">
            <CallIcon className="mb-4 h-12 w-12 text-[#1a1a1a] md:h-14 md:w-14" />
            <h3 className="text-lg font-bold tracking-tight text-[#1a1a1a] md:text-xl">
              24/7 Support
            </h3>
            <p className="mt-2 text-sm text-[#6b7280] md:text-base">
              Phone and Email support
            </p>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}

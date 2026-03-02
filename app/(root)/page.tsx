// package
import Link from "next/link";
import Image from "next/image";

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
    quote: `I've never felt better about my hair. CoElegance delivers on its promise of organic, effective hair care. My hair feels softer and looks fuller!`,
    author: "Mark Alice",
    location: "New York",
  },
  {
    quote: `Gentle, effective, and truly organic. I recommend CoElegance to everyone who cares about what they put on their hair and scalp.`,
    author: "Sarah Chen",
    location: "California",
  },
  {
    quote: `Finally, skincare that works without the chemicals. My complexion has never looked or felt better.`,
    author: "James Miller",
    location: "Texas",
  },
];

export default function Home() {
  const centerImages = [
    "/images/main.png",
    "/images/sumplekuping-2.png",
    "/images/sumplekuping-4.png",
  ];

  const randomCenterImage =
    centerImages[Math.floor(Math.random() * centerImages.length)];

  const featuredProductImages = [
    "/images/main.png",
    "/images/sumplekuping-2.png",
    "/images/sumplekuping-4.png",
    "/images/sumplekuping-5.png",
  ];
  const randomFeaturedImage =
    featuredProductImages[
      Math.floor(Math.random() * featuredProductImages.length)
    ];

  return (
    <>
      {/* Hero section */}
      <SectionLayout
        bg="bg-[#ffc95c]"
        className="flex flex-col items-center justify-between lg:grid lg:grid-cols-2 lg:pt-8"
      >
        {/* Text content */}
        <div className="flex flex-col items-center gap-6 p-8 sm:max-w-[600px] md:max-w-[600px] md:py-16 lg:order-2 lg:max-w-none lg:items-start lg:p-0">
          <div className="space-y-3 text-center lg:text-left">
            <Heading as="h1" intent="hero-section">
              Healthy hair <br />
              <span className="text-[#377DFF]">starts</span> with <br />
              CoElegance.
            </Heading>
            <Text className="md:text-lg lg:text-xl">
              Nourishing organic herbal hair oil for stronger, shinier, fuller-looking
              hair—powered by rosemary, onion, and black seed.
            </Text>
          </div>
          <div className="flex flex-col items-center gap-3 lg:flex-row">
            <Link href="/shop">
              <Button fontSize="sm" className="px-14 py-3 md:text-lg">
                Shop Hair Oil
              </Button>
            </Link>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/70">
              100% Herbal · No Sulfates · Made in Pakistan
            </p>
          </div>
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
              <span>Organic Hair Care</span>
              <span className="h-px w-8 bg-[#e3cfa4]" />
            </div>

            <Heading
              as="h2"
              intent="base-section"
              className="text-3xl leading-tight text-[#21411f] md:text-4xl lg:text-5xl"
            >
              Why Choose Organic Hair Oil
            </Heading>

            <Text
              size="sm"
              className="mx-auto max-w-2xl text-sm leading-relaxed text-[#5b6b5a] md:text-base"
            >
              At CoElegance, we believe hair care should be gentle, effective, and
              rooted in nature. Our organic herbal hair oil blends ingredients like
              rosemary, onion, and black seed to nourish the scalp, reduce hair fall,
              and support healthy growth—without harsh chemicals or heavy build-up.
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
                Nature&apos;s Hair Secret
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
                Our commitment to organic beauty is rooted in the belief that nature
                provides the best ingredients for strong, shiny hair. We carefully
                source our botanicals and oils, creating formulations that are free
                from sulfates, parabens, mineral oils, and synthetic fragrances.
              </Text>
            </div>

            <div className="flex justify-center">
              <div className="relative h-64 w-40 md:h-80 md:w-52 lg:h-96 lg:w-60">
                <Image
                  src={randomCenterImage}
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
                  Deep nourishment
                </Text>
                <Heading
                  as="h3"
                  intent="base-section"
                  className="text-xl text-[#21411f] md:text-2xl"
                >
                  Scalp & Hair Nourishment
                </Heading>
                <Text
                  size="sm"
                  className="max-w-sm text-sm leading-relaxed text-[#5b6b5a] md:text-base"
                >
                  Each drop of CoElegance Organic Herbal Hair Oil is infused with
                  nutrient-rich botanical extracts and essential oils that help
                  revitalize the scalp, strengthen roots, and bring back natural
                  shine. Healthy hair starts at the scalp—and we focus exactly there.
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
                  Our commitment to the environment goes hand in hand with our
                  organic philosophy. We use mindful packaging, support sustainable
                  sourcing, and minimize unnecessary waste. Beautiful hair
                  shouldn&apos;t come at the planet&apos;s expense—and we&apos;re
                  proud to do our part.
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
              Our Best Organic Hair Oil
            </Heading>
            <Text
              size="sm"
              className="text-sm leading-relaxed text-[#6b7280] md:text-base"
            >
              Discover our signature organic herbal hair oil, crafted to support hair
              growth, reduce breakage, and add natural shine with every use.
            </Text>
          </div>

          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              {/* Left: product image panel */}
              <div className="flex min-h-[280px] items-center justify-center bg-[#faf4e8] p-8 lg:min-h-0">
                <div className="relative h-56 w-40 md:h-72 md:w-48 lg:h-80 lg:w-52">
                  <Image
                    src={randomFeaturedImage}
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
                  CoElegance Organic Herbal Hair Oil | 100% Natural Blend
                </h3>
                <Text
                  size="sm"
                  className="mt-4 max-w-xl text-sm leading-relaxed text-[#6b7280] md:text-base"
                >
                  A lightweight yet powerful blend of herbal oils designed for daily
                  use. CoElegance Organic Herbal Hair Oil absorbs quickly without
                  leaving a greasy feel, helping to reduce hair fall, soothe dry
                  scalp, and enhance shine. Use it as a pre-wash treatment or
                  leave-in nourishment for visibly healthier hair over time.
                </Text>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/shop">
                    <Button
                      fontSize="sm"
                      className="rounded-xl bg-[#4a5d47] px-6 py-2.5 text-white hover:bg-[#3d4f3b]"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/shop">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10">
          <div className="mx-4 max-w-3xl text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Real Results
            </p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              See the natural shine CoElegance brings to your hair.
            </h2>
          </div>
        </div>
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
                Encrypted & secure checkout
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:py-12">
            <CallIcon className="mb-4 h-12 w-12 text-[#1a1a1a] md:h-14 md:w-14" />
            <h3 className="text-lg font-bold tracking-tight text-[#1a1a1a] md:text-xl">
              24/7 Support
            </h3>
            <p className="mt-2 text-sm text-[#6b7280] md:text-base">
                Phone and email support
            </p>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}

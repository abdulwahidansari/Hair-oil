import { productPath } from "@/lib/product";

/** Edit this list to add, remove, or reorder homepage hero slides. */
export type HeroSlideConfig = {
  id: string;
  background: string;
  image: {
    src: string;
    alt: string;
  };
  /** Desktop image column: left (default) or right */
  imagePosition?: "left" | "right";
  eyebrow?: string;
  headline: string;
  headlineAccent?: {
    word: string;
    className: string;
  };
  subheadline?: string;
  taglineBar?: {
    text: string;
    className: string;
  };
  ctaLabel: string;
  ctaHref: string;
  /** Optional extra classes for the text column */
  textTheme?: string;
};

export const HERO_SLIDES: HeroSlideConfig[] = [
  {
    id: "healthy-hair",
    background: "bg-[#ffc95c]",
    image: {
      src: "/images/main.png",
      alt: "Person with healthy, shiny hair",
    },
    imagePosition: "left",
    headline: "Healthy hair starts with care.",
    headlineAccent: {
      word: "starts",
      className: "text-[#377DFF]",
    },
    subheadline: "From root to tip refined care",
    ctaLabel: "Shopping Now",
    ctaHref: productPath(),
  },
  {
    id: "organic-spotlight",
    background: "bg-white",
    image: {
      src: "/images/bottel1.png",
      alt: "CoElegance Organic Hair Oil with golden oil splash",
    },
    imagePosition: "right",
    eyebrow: "100% Herbal Formula",
    headline: "CoElegance Organic Hair Oil",
    subheadline: "Cold-pressed botanical oils for stronger, fuller hair",
    taglineBar: {
      text: "Made with 20+ natural ingredients",
      className: "bg-[#2d5a3d] text-white",
    },
    ctaLabel: "Shop Now",
    ctaHref: productPath(),
    textTheme: "text-[#1a1a1a]",
  },
  {
    id: "herbal-growth",
    background: "bg-[#fdf7ef]",
    image: {
      src: "/images/bottel.png",
      alt: "CoElegance Organic Herbal Hair Oil bottle",
    },
    imagePosition: "right",
    eyebrow: "Pakistan's trusted herbal hair care",
    headline: "Reduce hair fall. Grow with confidence.",
    headlineAccent: {
      word: "Grow",
      className: "text-[#2d5a3d]",
    },
    subheadline: "20+ herbs · 6 natural oils · Cash on delivery nationwide",
    ctaLabel: "Buy Now",
    ctaHref: productPath(),
    textTheme: "text-[#21411f]",
  },
];

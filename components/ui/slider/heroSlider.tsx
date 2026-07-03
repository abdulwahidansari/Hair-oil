"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useKeenSlider, type KeenSliderPlugin } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HERO_SLIDES, type HeroSlideConfig } from "@/lib/hero-slides";
import Button from "@/ui/button";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import { cn } from "@/lib/utils";

import "keen-slider/keen-slider.min.css";

function AutoplayPlugin(delayMs = 6000): KeenSliderPlugin {
  return (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    const clear = () => clearTimeout(timeout);
    const schedule = () => {
      clear();
      if (mouseOver || slider.track.details.slides.length <= 1) return;
      timeout = setTimeout(() => slider.next(), delayMs);
    };

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clear();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        schedule();
      });
      schedule();
    });
    slider.on("dragStarted", clear);
    slider.on("animationEnded", schedule);
    slider.on("updated", schedule);
  };
}

function renderHeadline(slide: HeroSlideConfig) {
  if (!slide.headlineAccent) {
    return slide.headline;
  }

  const { word, className } = slide.headlineAccent;
  const parts = slide.headline.split(word);
  if (parts.length < 2) {
    return slide.headline;
  }

  return (
    <>
      {parts[0]}
      <span className={className}>{word}</span>
      {parts.slice(1).join(word)}
    </>
  );
}

function HeroSlidePanel({
  slide,
  isPrimary,
  isActive,
}: {
  slide: HeroSlideConfig;
  isPrimary: boolean;
  isActive: boolean;
}) {
  const imageFirst = slide.imagePosition !== "right";
  const HeadingTag = isPrimary ? "h1" : "h2";

  const headlineContent =
    slide.id === "healthy-hair" ? (
      <>
        Healthy hair <br />
        <span className="text-[#377DFF]">starts</span> with <br />
        care.
      </>
    ) : slide.id === "organic-spotlight" ? (
      <>
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#c45c4a] md:text-base">
          100% Herbal Formula
        </span>
        <span className="mt-2 block text-[#2d5a3d]">CoElegance Organic</span>
        <span className="block font-serif text-[#c45c4a]">Hair Oil</span>
      </>
    ) : (
      renderHeadline(slide)
    );

  const textBlock = (
    <div
      className={cn(
        "order-1 flex flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-6 md:py-14 lg:items-start lg:px-8 lg:py-16 lg:text-left",
        imageFirst ? "lg:order-2" : "lg:order-1",
        slide.textTheme,
      )}
    >
      {slide.eyebrow && slide.id !== "organic-spotlight" && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c7994b] md:text-sm">
          {slide.eyebrow}
        </p>
      )}

      <div className="max-w-xl space-y-3">
        <Heading
          as={HeadingTag}
          intent="hero-section"
          className={cn(
            "leading-[1.08]",
            slide.id === "healthy-hair" &&
              "text-[clamp(2rem,6vw,3.5rem)] md:text-6xl xl:text-7xl",
            slide.id === "organic-spotlight" &&
              "text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight text-[#2d5a3d] md:text-5xl xl:text-6xl",
            slide.id === "herbal-growth" &&
              "text-[clamp(1.75rem,5vw,3rem)] md:text-5xl xl:text-6xl",
          )}
        >
          {headlineContent}
        </Heading>

        {slide.taglineBar && (
          <div
            className={cn(
              "inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wide md:text-sm",
              slide.taglineBar.className,
            )}
          >
            {slide.taglineBar.text}
          </div>
        )}

        {slide.subheadline && (
          <Text className="text-base md:text-lg lg:text-xl">{slide.subheadline}</Text>
        )}
      </div>

      <Link href={slide.ctaHref} className="mt-1" tabIndex={isActive ? 0 : -1}>
        <Button fontSize="sm" className="px-10 py-3 md:px-14 md:text-lg">
          {slide.ctaLabel}
        </Button>
      </Link>
    </div>
  );

  const imageBlock = (
    <div
      className={cn(
        "order-2 flex min-h-[280px] w-full items-end justify-center overflow-hidden px-4 pb-10 pt-4 sm:min-h-[320px] sm:px-6 md:min-h-[360px] lg:min-h-0 lg:items-center lg:px-8 lg:py-10 lg:pb-10",
        imageFirst ? "lg:order-1" : "lg:order-2",
      )}
    >
      <div
        className={cn(
          "relative w-full",
          slide.id === "healthy-hair" && "max-w-[380px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]",
          slide.id === "organic-spotlight" && "max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]",
          slide.id === "herbal-growth" && "max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]",
        )}
      >
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          width={800}
          height={900}
          priority={slide.id === "healthy-hair"}
          sizes="(max-width: 1024px) 90vw, 480px"
          className={cn(
            "h-auto w-full object-contain",
            slide.id === "healthy-hair" && "object-cover object-top",
          )}
        />
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", slide.background)}>
      <div className="mx-auto grid min-h-[min(88vw,520px)] w-full max-w-[1440px] grid-cols-1 lg:min-h-[520px] lg:grid-cols-2 lg:items-stretch">
        {imageBlock}
        {textBlock}
      </div>
    </div>
  );
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: HERO_SLIDES.length > 1,
      slides: { perView: 1, spacing: 0 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [AutoplayPlugin()],
  );

  const goTo = useCallback(
    (index: number) => {
      instanceRef.current?.moveToIdx(index);
    },
    [instanceRef],
  );

  const showControls = HERO_SLIDES.length > 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      className="relative w-full min-h-[min(88vw,520px)] overflow-hidden lg:min-h-[520px]"
    >
      <div
        ref={sliderRef}
        className={cn("hero-slider keen-slider", loaded && "hero-slider--initialized")}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = !loaded ? index === 0 : index === currentSlide;

          return (
            <div
              key={slide.id}
              className="keen-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${HERO_SLIDES.length}`}
              aria-hidden={!isActive}
            >
              <HeroSlidePanel slide={slide} isPrimary={index === 0} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {showControls && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-200",
            loaded ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="relative mx-auto h-full max-w-[1440px]">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => instanceRef.current?.prev()}
              disabled={!loaded}
              className="pointer-events-auto absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#111827] shadow-md transition hover:bg-white disabled:pointer-events-none sm:left-4 md:flex lg:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => instanceRef.current?.next()}
              disabled={!loaded}
              className="pointer-events-auto absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#111827] shadow-md transition hover:bg-white disabled:pointer-events-none sm:right-4 md:flex lg:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 md:bottom-6">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = currentSlide === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive}
                    disabled={!loaded}
                    onClick={() => goTo(index)}
                    className={cn(
                      "rounded-full transition-all duration-300 disabled:pointer-events-none",
                      isActive
                        ? "h-3 w-3 border-2 border-[#111827] bg-transparent ring-2 ring-[#111827]/20"
                        : "h-2.5 w-2.5 bg-[#111827]/35 hover:bg-[#111827]/55",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

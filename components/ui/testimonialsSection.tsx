"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/ui/assets/svg";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const goPrev = () =>
    setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const goNext = () =>
    setCurrent((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  if (!t) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-white to-[#faf8f4]">
      {/* Subtle decorative elements */}
      <div className="absolute left-0 top-1/4 h-32 w-32 rounded-full bg-[#e8f0e6]/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-40 w-40 rounded-full bg-[#f5e8e4]/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Label */}
          <div className="mb-5 inline-flex items-center justify-center gap-3">
            <span className="h-px w-8 flex-1 max-w-12 bg-gradient-to-r from-transparent to-[#a8c9a4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c97a6a]">
              Testimonials
            </span>
            <span className="h-px w-8 flex-1 max-w-12 bg-gradient-to-l from-transparent to-[#a8c9a4]" />
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#2d4a2a] md:text-4xl lg:text-5xl">
            Our Clients Reviews
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6b7280] md:text-base">
            Real stories from people who love our organic hair care
          </p>

          {/* Quote card */}
          <div className="mt-12 rounded-2xl border border-[#e8ebe7] bg-white/80 p-8 shadow-[0_4px_24px_rgba(45,74,42,0.06)] backdrop-blur-sm md:mt-16 md:p-12 lg:rounded-3xl">
            {/* Opening quote mark */}
            <span className="inline-block font-serif text-5xl leading-none text-[#2d4a2a]/20 md:text-6xl">
              &ldquo;
            </span>

            <blockquote className="mt-2 font-serif text-lg leading-relaxed text-[#374151] md:text-xl md:leading-[1.7] lg:text-2xl lg:leading-[1.6]">
              {t.quote}
            </blockquote>

            {/* Navigation + author row */}
            <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-between sm:gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar placeholder with initial */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2d4a2a] to-[#3d5c38] text-lg font-bold text-white shadow-md">
                  {t.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#2d4a2a]">{t.author}</p>
                  <p className="text-sm text-[#6b7280]">{t.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={goPrev}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2d4a2a]/20 bg-white text-[#2d4a2a] transition hover:border-[#2d4a2a]/40 hover:bg-[#2d4a2a]/5"
                >
                  <ArrowRightIcon
                    stroke="currentColor"
                    className="h-5 w-5 rotate-180"
                  />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={goNext}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2d4a2a]/20 bg-white text-[#2d4a2a] transition hover:border-[#2d4a2a]/40 hover:bg-[#2d4a2a]/5"
                >
                  <ArrowRightIcon stroke="currentColor" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-[#2d4a2a]"
                    : "w-2 bg-[#c5d4c3] hover:bg-[#a8c9a4]"
                )}
              />
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b7280]">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-500">★★★★★</span>
              <span>Rated by our customers</span>
            </span>
            <span className="hidden h-4 w-px bg-[#d1d5db] sm:block" />
            <span>Trusted by thousands</span>
          </div>
        </div>
      </div>
    </section>
  );
}

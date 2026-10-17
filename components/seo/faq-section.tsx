import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/lib/faq";

type FaqSectionProps = {
  faqs: FaqItem[];
  heading?: string;
  id?: string;
  className?: string;
};

/**
 * Visible FAQ list. Native <details> keeps every answer in the server-rendered HTML
 * (collapsed visually, not removed). The same items feed the FAQPage JSON-LD, so what
 * search engines read is exactly what visitors can read.
 */
export function FaqSection({
  faqs,
  heading = "Frequently asked questions",
  id = "faq",
  className,
}: FaqSectionProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={className ?? "mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8"}
    >
      <h2 id={`${id}-heading`} className="mb-6 text-2xl font-semibold text-[#111827]">
        {heading}
      </h2>
      <div className="border-t border-gray-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-gray-200">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-gray-50/80 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-medium text-[#111827]">{faq.question}</h3>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[#111827] transition-transform duration-300 ease-out group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-[#4b5563] sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

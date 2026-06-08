import type { Metadata } from "next";

import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/contact", {
  title: "Contact CoElegance Pakistan",
  description:
    "Contact CoElegance for orders, delivery, or product support. Reach us for organic herbal hair oil inquiries anywhere in Pakistan.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

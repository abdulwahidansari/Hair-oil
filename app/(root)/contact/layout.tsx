import type { Metadata } from "next";

import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact CoElegance Pakistan",
  description:
    "Contact CoElegance for orders, delivery, or product support. Reach us for organic herbal hair oil inquiries anywhere in Pakistan.",
  ...canonicalFor("/contact"),
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

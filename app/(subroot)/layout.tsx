import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: "CoElegance Organic Herbal Hair Oil | Natural Hair Growth & Scalp Care",
  description: "CoElegance Organic Herbal Hair Oil blends rosemary, onion, black seed and botanical oils to reduce hair fall, strengthen roots and support healthy natural hair growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={false}>{children}</PageLayout>;
}

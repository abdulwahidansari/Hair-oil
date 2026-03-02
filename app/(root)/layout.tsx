import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: "CoElegance Organic Herbal Hair Oil | Natural Hair Growth & Scalp Care",
  description:
    "CoElegance Organic Herbal Hair Oil - natural hair growth and scalp care. Premium organic ingredients for healthier hair.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={true}>{children}</PageLayout>;
}

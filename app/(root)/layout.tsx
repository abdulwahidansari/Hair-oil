import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: {
    default: "CoElegance Pakistan | Organic Herbal Hair Care",
    template: "%s | CoElegance Pakistan",
  },
  description:
    "CoElegance offers organic herbal hair oil in Pakistan to reduce hair fall, strengthen roots and improve scalp health.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={true}>{children}</PageLayout>;
}

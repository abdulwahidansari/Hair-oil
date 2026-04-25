import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: {
    default: "Shop CoElegance Products",
    template: "%s | CoElegance Pakistan",
  },
  description:
    "Shop CoElegance organic herbal hair oil products designed for Pakistani hair concerns, including hair fall, dandruff and weak roots.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={false}>{children}</PageLayout>;
}

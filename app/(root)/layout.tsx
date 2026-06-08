import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: {
    default: "CoElegance Pakistan | Organic Herbal Hair Care",
    template: "%s | CoElegance Pakistan",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={true}>{children}</PageLayout>;
}

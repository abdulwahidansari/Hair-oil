import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";

export const metadata: Metadata = {
  title: "Coeleganceintl - Premium Audio Equipment Store",
  description: "Coeleganceintl - Your destination for high-quality headphones and audio equipment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={true}>{children}</PageLayout>;
}

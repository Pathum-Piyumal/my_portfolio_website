import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Alex Chen | Engineering Journey",
  description: "Learn more about Alex Chen's software engineering journey, full-stack systems building, and technical arsenal.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

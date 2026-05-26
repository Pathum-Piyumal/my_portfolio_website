import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AccentProvider } from "@/lib/AccentContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "R.M.P.P. Kumarathunga | Chief Engineer & Fullstack Developer Portfolio",
  description: "Chief Engineer & Fullstack developer portfolio. Crafting scalable backend microservices gateways, high-fidelity UI engineering systems, and AI-powered sandboxes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white">
        <AccentProvider>
          {children}
        </AccentProvider>
      </body>
    </html>
  );
}


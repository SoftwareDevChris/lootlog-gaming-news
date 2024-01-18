import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaming News | Home",
  description: "Your nerdy source for gaming news and reviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

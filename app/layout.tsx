import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { AuthProvider } from "@/context/auth";

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
    <AuthProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} relative bg-neutral-900`}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </AuthProvider>
  );
}

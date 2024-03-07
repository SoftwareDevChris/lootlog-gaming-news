import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Clerk Auth
import { ClerkProvider } from "@clerk/nextjs";

// Components
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";

// Context
import { AuthProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaming News",
  description: "Your source for the lastest gaming news and reviews.",
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
            <div className="relative flex min-h-[calc(100svh-540px-64px)] flex-col md:min-h-[calc(100vh-240px-64px)]">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </AuthProvider>
  );
}

import type { Metadata } from "next";

import "./layout.scss";

// Clerk Auth
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "react-hot-toast";

// Components
import { Header } from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Loot Log - Gaming News and Reviews",
  description:
    "Loot Log is your source for the lastest gaming news and reviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`relative`}>
          <Header />
          <Toaster />
          <div className="relative flex min-h-[calc(100svh-64px)] flex-col md:min-h-[calc(100vh-64px)]">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

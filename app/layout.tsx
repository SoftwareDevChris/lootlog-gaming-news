import "./layout.scss";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "react-hot-toast";

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
        <body>
          <div id="app">
            <Header />
            <Toaster />
            <div id="app-portal">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

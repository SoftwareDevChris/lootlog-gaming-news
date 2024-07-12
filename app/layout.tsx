import "./layout.scss";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";

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
    <html lang="en">
      <body>
        <div id="app">
          <Header />
          <Toaster />
          <div id="app-portal">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import { press_start, lato } from "./fonts";

import "./layout.scss";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Loot Log - Gaming News and more",
  description:
    "Loot Log is your source for the lastest news in the gaming world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${press_start.variable} ${lato.variable}`}>
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

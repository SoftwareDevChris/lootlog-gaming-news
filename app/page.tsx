import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Featured } from "@/components/article-containers/frontpage/Featured";

export default function Home() {
  return (
    <main className="bg-neutral-900">
      <Header />
      <Hero />

      <div className="p-4 sm:p-8">
        <Featured />
      </div>
    </main>
  );
}

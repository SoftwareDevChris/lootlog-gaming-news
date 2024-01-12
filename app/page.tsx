import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FrontpageTitle } from "@/components/FrontpageTitle";
import { Featured } from "@/components/articles/sections/Featured";
import { VerticalList } from "@/components/articles/sections/VerticalList";

export default function Home() {
  return (
    <main className="bg-neutral-900">
      <Header />
      <Hero />

      <div className="p-4 sm:p-8">
        <FrontpageTitle />
      </div>

      <section className="p-4 sm:p-8">
        <Featured title="Latest" link="/news" />
      </section>

      <section className="p-4 sm:p-8">
        <VerticalList title="News" link="/news" />
        <VerticalList title="Videos" link="/videos" />
        <VerticalList title="Reviews" link="/reviews" />
      </section>
    </main>
  );
}

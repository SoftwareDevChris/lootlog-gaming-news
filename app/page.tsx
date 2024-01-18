import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FrontpageTitle } from "@/components/FrontpageTitle";
import { Latest } from "@/components/articles/sections/latest/Latest";
import { HorizontalList } from "@/components/articles/sections/horizontalList/HorizontalList";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";

import { dummyArticles } from "@/utils/dummyData";
import { SectionContainer } from "@/components/containers/SectionContainer";

export default function Home() {
  return (
    <main>
      <Hero />

      <SectionContainer>
        <Slideshow slides={dummyArticles} />
      </SectionContainer>

      <SectionContainer>
        <Latest title="Latest" link="/news" />
      </SectionContainer>

      <SectionContainer>
        <HorizontalList title="News" link="/news" />
        <HorizontalList title="Videos" link="/videos" />
        <HorizontalList title="Reviews" link="/reviews" />
      </SectionContainer>
    </main>
  );
}

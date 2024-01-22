import { Latest } from "@/components/articles/sections/latest/Latest";
import { HorizontalList } from "@/components/articles/sections/horizontalList/HorizontalList";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";

import { dummyArticles } from "@/utils/dummyData";
import { SectionContainer } from "@/components/containers/SectionContainer";

export default function Home() {
  return (
    <main>
      <SectionContainer>
        <Slideshow slides={dummyArticles} />
      </SectionContainer>

      <SectionContainer>
        <Latest title="Latest" route="/news" />
      </SectionContainer>

      <SectionContainer>
        <HorizontalList title="News" route="/news" />
        <HorizontalList title="Videos" route="/videos" />
        <HorizontalList title="Reviews" route="/reviews" />
      </SectionContainer>
    </main>
  );
}

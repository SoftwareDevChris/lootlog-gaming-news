// Components
import { Latest } from "@/components/articles/sections/latest/Latest";
import { HorizontalList } from "@/components/articles/sections/horizontalList/HorizontalList";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";
import { SectionContainer } from "@/components/containers/SectionContainer";

// Utils
import { DUMMY_ARTICLES } from "@/utils/dummyData";

export default async function Home() {
  return (
    <main>
      <SectionContainer>
        <Slideshow slides={DUMMY_ARTICLES} />
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

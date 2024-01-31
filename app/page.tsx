import { Latest } from "@/components/articles/sections/latest/Latest";
import { HorizontalList } from "@/components/articles/sections/horizontalList/HorizontalList";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";

import { DUMMY_ARTICLES } from "@/utils/dummyData";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  // Check DB for user

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

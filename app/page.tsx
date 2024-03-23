import { unstable_cache } from "next/cache";

// Components
import { LatestSection } from "@/components/articles/sections/latest-section/LatestSection";
import { ScrollableSection } from "@/components/articles/sections/scrollable-section/ScrollableSection";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllArticles } from "@/lib/queries";
import { sortByDate } from "@/lib/sort-by-date";

export default async function Home() {
  const allArticles = unstable_cache(getAllArticles, ["allArticles"], {
    revalidate: 60 * 60,
  });

  // If there is an error getting the articles, display an error overlay
  if ((await allArticles()).status !== 200) {
    return (
      <OverlayError message="The website is under maintenance. Please come back later." />
    );
  }

  // Sort the articles by date
  const sortedArticles = sortByDate((await allArticles()).articles);

  const newsArticles = sortedArticles
    .filter((article) => article.categoryId === 1)
    .slice(0, 6);

  const reviewArticles = sortedArticles
    .filter((article) => article.categoryId === 2)
    .slice(0, 6);

  return (
    <main>
      <SectionContainer>
        <Slideshow articles={sortedArticles} />
      </SectionContainer>

      <SectionContainer>
        <LatestSection title="Latest" route="/news" articles={sortedArticles} />
      </SectionContainer>

      <SectionContainer>
        <ScrollableSection title="News" route="/news" articles={newsArticles} />
        <ScrollableSection
          title="Reviews"
          route="/reviews"
          articles={reviewArticles}
        />
      </SectionContainer>
    </main>
  );
}

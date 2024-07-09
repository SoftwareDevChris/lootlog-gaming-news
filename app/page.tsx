import { unstable_cache } from "next/cache";

// Components
import { LatestSection } from "@/components/articles/sections/latest-section/LatestSection";
import { ScrollableSection } from "@/components/articles/sections/scrollable-section/ScrollableSection";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllPublicArticles } from "@/lib/articleService";

// Types
import { TArticle } from "@/types/types";
import { Footer } from "@/components/Footer";
import { HighlightSection } from "@/components/articles/sections/highligt-section/HighlightSection";

export default async function Home() {
  const getArticles = unstable_cache(
    getAllPublicArticles,
    ["get-all-public-articles"],
    {
      revalidate: 60 * 30,
    },
  );

  const articles = await getArticles();

  // If there is an error getting the articles, display an error overlay
  if (!articles.articles || articles.articles.length < 5) {
    return (
      <OverlayError message="The website is under maintenance. Please come back later." />
    );
  }

  return (
    <>
      <main>
        <SectionContainer>
          <HighlightSection articles={articles.articles.slice(0, 5)} />
        </SectionContainer>

        {/* <SectionContainer>
          <LatestSection title="Latest" articles={latestArticles} />
        </SectionContainer>

        <SectionContainer>
          <ScrollableSection
            title="News"
            route="/news"
            articles={newsArticles}
          />
          <ScrollableSection
            title="Reviews"
            route="/reviews"
            articles={reviewArticles}
          />
        </SectionContainer> */}
      </main>
    </>
  );
}

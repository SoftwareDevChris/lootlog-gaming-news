import { unstable_cache } from "next/cache";

// Components
import { LatestSection } from "@/components/articles/sections/latest-section/LatestSection";
import { ScrollableSection } from "@/components/articles/sections/scrollable-section/ScrollableSection";
import { Slideshow } from "@/components/articles/sections/slideshow/Slideshow";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllPublicArticles } from "@/lib/queries";
import { sortByDate } from "@/lib/sort-by-date";

// Types
import { TArticle } from "@/types/types";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const publicArticles = unstable_cache(
    getAllPublicArticles,
    ["get-all-public-articles"],
    {
      revalidate: 60 * 60,
    },
  );

  // If there is an error getting the articles, display an error overlay
  if ((await publicArticles()).status !== 200) {
    return (
      <OverlayError message="The website is under maintenance. Please come back later." />
    );
  }

  // Sort the articles by date
  const sortedArticles = sortByDate(
    (await publicArticles()).articles as TArticle[],
  );

  // Get the first 5 featured articles for the slideshow
  const slideshowArticles = sortedArticles
    .filter((article) => article.is_featured)
    .slice(0, 5);

  // Get the latest articles that are not featured
  const notFeaturedArticles = sortedArticles.filter(
    (article) => !article.is_featured,
  );

  // Get the first 5 articles that are not featured
  const latestArticles = notFeaturedArticles.slice(0, 5);

  // Get the first 6 articles for each category that are not featured
  const newsArticles = sortedArticles
    .filter((article) => article.category?.name === "article")
    .slice(0, 6);

  const reviewArticles = sortedArticles
    .filter((article) => article.category?.name === "review")
    .slice(0, 6);

  return (
    <>
      <main>
        <SectionContainer>
          <Slideshow articles={slideshowArticles} />
        </SectionContainer>

        <SectionContainer>
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
        </SectionContainer>
      </main>

      <Footer />
    </>
  );
}

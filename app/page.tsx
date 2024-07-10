import { unstable_cache } from "next/cache";

// Components
import { HighlightSection } from "@/components/sections/highligt-section/HighlightSection";
import { FourSection } from "@/components/sections/four-section/FourSection";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllPublicArticles } from "@/lib/articleService";

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
        <HighlightSection articles={articles.articles.slice(0, 5)} />

        <FourSection articles={articles.articles.slice(1, 5)} />
      </main>
    </>
  );
}

import { Suspense } from "react";
import { unstable_cache } from "next/cache";

// Components
import { HighlightSection } from "@/components/sections/highligt-section/HighlightSection";
import { FourSection } from "@/components/sections/four-section/FourSection";

// Lib
import {
  getAllPublicArticles,
  getArticlesByCategory,
} from "@/lib/articleService";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { ErrorStatus } from "@/components/status/ErrorStatus";
import { ReviewSection } from "@/components/sections/review-section/ReviewSection";

export default async function Home() {
  const newsArticles = await getArticlesByCategory("news article", 8);

  if (!newsArticles.articles) return;

  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <HighlightSection articles={newsArticles.articles.slice(0, 4)} />

        <FourSection articles={newsArticles.articles.slice(4, 8)} />

        <ReviewSection />
      </Suspense>
    </main>
  );
}

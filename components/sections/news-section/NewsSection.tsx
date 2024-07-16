import { getArticlesByCategory } from "@/lib/articleService";

import { FourSection } from "../four-section/FourSection";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";
import { HighlightSection } from "../highligt-section/HighlightSection";

export const NewsSection = async () => {
  const newsArticles = await getArticlesByCategory("news article", 8);

  if (!newsArticles.articles) return <LoadingSpinner theme="orange" />;

  return (
    <>
      <HighlightSection articles={newsArticles.articles.slice(0, 4)} />
      <FourSection articles={newsArticles.articles.slice(4, 8)} />
    </>
  );
};

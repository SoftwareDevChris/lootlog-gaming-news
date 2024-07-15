import { getArticlesByCategory } from "@/lib/articleService";

import { FourSection } from "../four-section/FourSection";
import { SectionTitle } from "../SectionTitle";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

export const ReviewSection = async () => {
  const articles = await getArticlesByCategory("review", 4);

  if (!articles.articles) return <LoadingSpinner theme="orange" />;

  return (
    <>
      <SectionTitle title="Reviews" route="/reviews" />
      <FourSection articles={articles.articles} />
    </>
  );
};

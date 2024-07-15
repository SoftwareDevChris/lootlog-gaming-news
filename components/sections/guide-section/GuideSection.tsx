import { getArticlesByCategory } from "@/lib/articleService";

import { FourSection } from "../four-section/FourSection";
import { SectionTitle } from "../SectionTitle";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

export const GuideSection = async () => {
  const articles = await getArticlesByCategory("guide", 4);

  if (!articles.articles) return <LoadingSpinner theme="orange" />;

  return (
    <>
      <SectionTitle title="Guides" route="/guides" />
      <FourSection articles={articles.articles} />
    </>
  );
};

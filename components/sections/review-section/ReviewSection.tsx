import { unstable_cache } from "next/cache";

import { FourSection } from "../four-section/FourSection";
import { SectionTitle } from "../SectionTitle";
import { getArticlesByCategory } from "@/lib/articleService";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

export const ReviewSection = async () => {
  const articles = await getArticlesByCategory("review");

  if (!articles.articles) return <LoadingSpinner theme="orange" />;

  return (
    <Suspense>
      <SectionTitle title="Reviews" route="/reviews" />
      <FourSection articles={articles.articles} />
    </Suspense>
  );
};

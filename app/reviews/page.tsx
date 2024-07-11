import { Suspense } from "react";
import { unstable_cache } from "next/cache";

import {
  getAllPublicArticles,
  getArticlesByCategory,
} from "@/lib/articleService";

// Components
import { PageTitle } from "@/components/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function Reviews() {
  const articles = await getArticlesByCategory("review");

  if (!articles.articles) return <LoadingScreen />;

  return (
    <main>
      <PageTitle
        title="Reviews"
        paragraph="Read our honest, detailed, and informative reviews of the best games in the market. Loot Log's reviews section is your guide to gaming."
      />

      <SectionTitle title="Reviews" />

      <Suspense fallback={<LoadingScreen />}>
        <PaginationGrid articles={articles.articles} />
      </Suspense>
    </main>
  );
}

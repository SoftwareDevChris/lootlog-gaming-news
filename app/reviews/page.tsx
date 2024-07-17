import { Suspense } from "react";

import { getArticlesByCategory } from "@/lib/articleService";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function ReviewsPage() {
  const articles = await getArticlesByCategory("review");

  if (!articles.articles) return <LoadingScreen />;

  return (
    <main>
      <PageTitle
        title="Reviews"
        subtitle="Read our honest, detailed, and informative reviews of the best games in the market. This section is your guide to gaming."
      />

      <Suspense fallback={<LoadingScreen />}>
        <PaginationGrid articles={articles.articles} />
      </Suspense>
    </main>
  );
}

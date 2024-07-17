import { Suspense } from "react";

import { getArticlesByCategory } from "@/lib/articleService";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function NewsPage() {
  const articles = await getArticlesByCategory("news article");

  if (!articles.articles) return <LoadingScreen />;

  return (
    <main>
      <PageTitle
        title="News"
        subtitle="Stay updated with the latest happenings in the world of gaming."
      />

      <Suspense fallback={<LoadingScreen />}>
        <PaginationGrid articles={articles.articles} />
      </Suspense>
    </main>
  );
}

import { Suspense } from "react";

import { getArticlesByCategory } from "@/lib/articleService";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function VideosPage() {
  const articles = await getArticlesByCategory("video");

  if (!articles.articles) return <LoadingScreen />;

  return (
    <main>
      <PageTitle
        title="Videos"
        subtitle="Do you enjoy getting your news in a video format? Look nu further. In this section we deliver everything from news, reviews and guides."
      />

      <Suspense fallback={<LoadingScreen />}>
        <PaginationGrid articles={articles.articles} />
      </Suspense>
    </main>
  );
}

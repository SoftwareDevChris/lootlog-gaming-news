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

export default async function News() {
  const articles = await getArticlesByCategory("news article");

  if (!articles.articles) return <LoadingScreen />;

  return (
    <main>
      <PageTitle
        title="News"
        paragraph="Stay updated with the latest happenings in the gaming world. Loot Log's news section is your one-stop shop for all things gaming."
      />

      <SectionTitle title="News" />
      <Suspense fallback={<LoadingScreen />}>
        <PaginationGrid articles={articles.articles} />
      </Suspense>
    </main>
  );
}

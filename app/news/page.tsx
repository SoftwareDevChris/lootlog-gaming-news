import { Suspense } from "react";
import { unstable_cache } from "next/cache";

import { getAllPublicArticles } from "@/lib/articleService";

// Components
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { PaginationGrid } from "@/components/articles/sections/pagination-grid/PaginationGrid";
import { ArticleSectionTitle } from "@/components/articles/sections/ArticleSectionTitle";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function News() {
  const allArticles = unstable_cache(
    getAllPublicArticles,
    ["get-all-public-articles"],
    {
      revalidate: 60 * 60,
    },
  );

  const filteredArticles = (await allArticles()).articles;

  return (
    <main>
      <SectionContainer>
        <PageTitle
          title="News"
          paragraph="Stay updated with the latest happenings in the gaming world. Loot Log's news section is your one-stop shop for all things gaming."
        />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <ArticleSectionTitle title="News" />
        </div>
        <Suspense fallback={<LoadingScreen />}>
          {filteredArticles && <PaginationGrid articles={filteredArticles} />}
        </Suspense>
      </SectionContainer>
    </main>
  );
}

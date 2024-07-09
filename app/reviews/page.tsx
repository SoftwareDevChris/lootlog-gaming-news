import { Suspense } from "react";
import { unstable_cache } from "next/cache";

import { getAllPublicArticles } from "@/lib/articleService";

// Components
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { PaginationGrid } from "@/components/articles/sections/pagination-grid/PaginationGrid";
import { ArticleSectionTitle } from "@/components/articles/sections/ArticleSectionTitle";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function Reviews() {
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
          title="Reviews"
          paragraph="Read our honest, detailed, and informative reviews of the best games in the market. Loot Log's reviews section is your guide to gaming."
        />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <ArticleSectionTitle title="Reviews" />
        </div>
        <Suspense fallback={<LoadingScreen />}>
          {filteredArticles && <PaginationGrid articles={filteredArticles} />}
        </Suspense>
      </SectionContainer>
    </main>
  );
}

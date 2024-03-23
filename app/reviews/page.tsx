import { unstable_cache } from "next/cache";

// Components
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { PaginationGrid } from "@/components/articles/sections/pagination-grid/PaginationGrid";
import { ArticleSectionTitleDefault } from "@/components/articles/sections/ArticleSectionTitleDefault";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllArticles } from "@/lib/queries";
import { sortByDate } from "@/lib/sort-by-date";

// Types
import { TArticle } from "@/types/types";

export default async function Reviews() {
  const allArticles = unstable_cache(getAllArticles, ["allArticles"], {
    revalidate: 60 * 60,
  });

  // If there is an error getting the articles, display an error overlay
  if ((await allArticles()).status !== 200) {
    return <OverlayError message="There was an error getting the articles" />;
  }

  // Sort the articles by date
  const filteredArticles = (await allArticles()).articles.filter(
    (article: TArticle) => article.categoryId === 2,
  );
  const sortedArticles = sortByDate(filteredArticles);

  return (
    <main>
      <SectionContainer>
        <PageTitle
          title="Reviews"
          paragraph="Read our honest, detailed, and informative reviews of the best games in the market. GameZone's reviews section is your guide to gaming."
        />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <ArticleSectionTitleDefault title="All reviews" />
        </div>
        <PaginationGrid articles={sortedArticles} />
      </SectionContainer>
    </main>
  );
}

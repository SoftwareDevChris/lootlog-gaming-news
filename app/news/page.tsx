import { unstable_cache } from "next/cache";

// Components
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { PaginationGrid } from "@/components/articles/sections/pagination-grid/PaginationGrid";
import { ArticleSectionTitleDefault } from "@/components/articles/ArticleSectionTitleDefault";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllArticles } from "@/lib/queries";
import { sortByDate } from "@/lib/sort-by-date";

// Types
import { TArticle } from "@/types/types";

export default async function News() {
  const allArticles = unstable_cache(getAllArticles, ["allArticles"], {
    revalidate: 60 * 60,
  });

  // If there is an error getting the articles, display an error overlay
  if ((await allArticles()).status !== 201) {
    return <OverlayError message="There was an error getting the articles" />;
  }

  // Sort the articles by date
  const filteredArticles = (await allArticles()).articles.filter(
    (article: TArticle) => article.categoryId === 1,
  );
  const sortedArticles = sortByDate(filteredArticles);

  return (
    <main>
      <SectionContainer>
        <PageTitle
          title="News"
          paragraph="Stay updated with the latest happenings in the gaming world. GameZone's news section is your one-stop shop for all things gaming."
        />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <ArticleSectionTitleDefault title="All news articles" />
        </div>
        <PaginationGrid articles={sortedArticles} />
      </SectionContainer>
    </main>
  );
}

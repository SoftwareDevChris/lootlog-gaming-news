import { unstable_cache } from "next/cache";

// Components
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { PaginationGrid } from "@/components/articles/sections/pagination-grid/PaginationGrid";
import { ArticleSectionTitle } from "@/components/articles/sections/ArticleSectionTitle";
import { OverlayError } from "@/components/overlays/OverlayError";

// Lib
import { getAllPublicArticles } from "@/lib/queries";
import { sortByDate } from "@/lib/sort-by-date";

// Types
import { TArticle } from "@/types/types";

export default async function News() {
  const allArticles = unstable_cache(
    getAllPublicArticles,
    ["get-all-public-articles"],
    {
      revalidate: 60 * 60,
    },
  );

  // If there is an error getting the articles, display an error overlay
  if ((await allArticles()).status !== 200) {
    return <OverlayError message="There was an error getting the articles" />;
  }

  // Sort the articles by date
  const filteredArticles = (await allArticles()).articles?.filter(
    (article) => article.categoryId === 1,
  );
  const sortedArticles = sortByDate(filteredArticles as TArticle[]);

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
        <PaginationGrid articles={sortedArticles} />
      </SectionContainer>
    </main>
  );
}

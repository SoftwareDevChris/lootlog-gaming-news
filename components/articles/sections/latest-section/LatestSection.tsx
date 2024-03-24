// Components
import { LatestSectionItem } from "./LatestSectionItem";
import { ArticleSectionTitle } from "../ArticleSectionTitle";

// Dummy data
import { DUMMY_ARTICLES } from "@/utils/dummyData";

// Types
import { TArticle } from "@/types/types";

export const LatestSection: React.FC<{
  title: string;
  articles: TArticle[];
}> = ({ title, articles }) => {
  return (
    <div className="mx-auto max-w-1300">
      <ArticleSectionTitle title={title} />
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-4">
        {/* Big article */}
        <div className="col-span-1 row-span-1 flex w-full lg:col-span-2 lg:row-span-2">
          <LatestSectionItem
            isSpotlight
            article={articles[0] ? articles[0] : DUMMY_ARTICLES[0]}
          />
        </div>

        {/* Small articles */}
        <LatestSectionItem
          article={articles[1] ? articles[1] : DUMMY_ARTICLES[1]}
        />
        <LatestSectionItem
          article={articles[2] ? articles[2] : DUMMY_ARTICLES[2]}
        />
        <LatestSectionItem
          article={articles[3] ? articles[3] : DUMMY_ARTICLES[3]}
        />
        <LatestSectionItem
          article={articles[4] ? articles[4] : DUMMY_ARTICLES[4]}
        />
      </div>
    </div>
  );
};

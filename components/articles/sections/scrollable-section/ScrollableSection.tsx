// Components
import { ScrollableSectionItem } from "./ScrollableSectionItem";
import { ArticleSectionTitleDefault } from "../../ArticleSectionTitleDefault";

// Types
import { TArticle } from "@/types/types";

type Props = {
  title: string;
  route: string;
  articles: TArticle[];
};

export const ScrollableSection: React.FC<Props> = ({
  title,
  route,
  articles,
}) => {
  if (!articles) {
    return null;
  }

  return (
    <div className="mx-auto mb-8 w-full max-w-1300">
      <ArticleSectionTitleDefault title={title} route={route} />
      <div className="custom-scrollbar flex w-full flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 sm:overflow-x-scroll sm:pb-1">
        {articles.map((article) => (
          <ScrollableSectionItem key={article.id} noFlex article={article} />
        ))}
      </div>
    </div>
  );
};

// Components
import { PaginationGridItem } from "./PaginationGridItem";

// Types
import { TArticle } from "@/types/types";

type Props = {
  articles: TArticle[];
};

// TODO: Implement pagination

export const PaginationGrid: React.FC<Props> = ({ articles }) => {
  return (
    <div className="mx-auto grid max-w-1300 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article, index) => {
        return <PaginationGridItem article={article} key={article.id} />;
      })}
    </div>
  );
};

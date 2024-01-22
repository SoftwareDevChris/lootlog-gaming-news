import { dummyArticles } from "@/utils/dummyData";
import { GridItem } from "./GridItem";

export const Grid = () => {
  return (
    <div className="mx-auto grid max-w-1300 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {dummyArticles.map((article, index) => {
        return <GridItem content={article} key={index} />;
      })}
    </div>
  );
};

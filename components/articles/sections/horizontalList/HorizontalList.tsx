import { Article } from "../../Article";
import { SectionTitleDefault } from "../../SectionTitleDefault";

import { dummyArticles } from "@/utils/dummyData";

export const HorizontalList: React.FC<{ title: string; route: string }> = ({
  title,
  route,
}) => {
  return (
    <div className="mx-auto mb-8 w-full max-w-1300">
      <SectionTitleDefault title={title} route={route} />
      <div className="custom-scrollbar flex w-full flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 sm:overflow-x-scroll sm:pb-1">
        <Article noFlex content={dummyArticles[0]} />
        <Article noFlex content={dummyArticles[1]} />
        <Article noFlex content={dummyArticles[2]} />
        <Article noFlex content={dummyArticles[3]} />
        <Article noFlex content={dummyArticles[4]} />
        <Article noFlex content={dummyArticles[0]} />
      </div>
    </div>
  );
};

import { Article } from "./Article";
import { SectionTitleDefault } from "../../SectionTitleDefault";

import { dummyArticles } from "@/utils/dummyData";

export const Latest: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  return (
    <div className="mx-auto max-w-1300">
      <SectionTitleDefault title={title} link={link} />
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-4">
        {/* Big article */}
        <div className="col-span-1 row-span-1 flex w-full lg:col-span-2 lg:row-span-2">
          <Article isSpotlight content={dummyArticles[0]} />
        </div>
        {/* Small articles */}

        <Article content={dummyArticles[1]} />
        <Article content={dummyArticles[2]} />
        <Article content={dummyArticles[3]} />
        <Article content={dummyArticles[4]} />
      </div>
    </div>
  );
};

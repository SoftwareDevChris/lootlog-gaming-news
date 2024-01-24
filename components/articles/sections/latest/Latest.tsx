import { Article } from "./Article";
import { SectionTitleDefault } from "../../SectionTitleDefault";

import { DUMMY_ARTICLES } from "@/utils/dummyData";

export const Latest: React.FC<{ title: string; route: string }> = ({
  title,
  route,
}) => {
  return (
    <div className="mx-auto max-w-1300">
      <SectionTitleDefault title={title} route={route} />
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-4">
        {/* Big article */}
        <div className="col-span-1 row-span-1 flex w-full lg:col-span-2 lg:row-span-2">
          <Article isSpotlight content={DUMMY_ARTICLES[0]} />
        </div>
        {/* Small articles */}

        <Article content={DUMMY_ARTICLES[1]} />
        <Article content={DUMMY_ARTICLES[2]} />
        <Article content={DUMMY_ARTICLES[3]} />
        <Article content={DUMMY_ARTICLES[4]} />
      </div>
    </div>
  );
};

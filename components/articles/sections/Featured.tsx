import { Article } from "../Article";
import { SectionTitleDefault } from "../titles/SectionTitleDefault";

export const Featured: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  return (
    <div className="max-w-1300 mx-auto">
      <SectionTitleDefault title={title} link={link} />
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-4">
        {/* Big article */}
        <div className="col-span-1 row-span-1 flex w-full lg:col-span-2 lg:row-span-2">
          <Article isSpotlight />
        </div>
        {/* Small articles */}

        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
};

import { Article } from "../Article";
import { SectionTitleDefault } from "../titles/SectionTitleDefault";

export const VerticalList: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  return (
    <div className="max-w-1300 mx-auto mb-8 w-full">
      <SectionTitleDefault title={title} link={link} />
      <div className="custom-scrollbar flex w-full flex-col space-y-3 sm:h-[260px] sm:flex-row sm:space-x-3 sm:space-y-0 sm:overflow-x-scroll sm:pb-1">
        <Article noFlex />
        <Article noFlex />
        <Article noFlex />
        <Article noFlex />
        <Article noFlex />
      </div>
    </div>
  );
};

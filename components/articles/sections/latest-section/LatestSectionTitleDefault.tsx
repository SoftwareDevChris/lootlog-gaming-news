import { shortenTitle } from "@/lib/title-shortener";

type Props = {
  title: string;
};

export const LatestSectionTitleDefault: React.FC<Props> = ({ title }) => {
  const articleTitle = shortenTitle(title, 90);
  return (
    <h6 className="article-section-item-title border-t border-neutral-100 px-2 py-1 text-xs text-white sm:text-sm lg:text-xs">
      {articleTitle}
    </h6>
  );
};

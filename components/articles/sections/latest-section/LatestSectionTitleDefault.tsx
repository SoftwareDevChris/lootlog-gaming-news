import { shortenTitle } from "@/lib/title-shortener";

export const LatestSectionTitleDefault: React.FC<{ title: string }> = ({
  title,
}) => {
  const articleTitle = shortenTitle(title, 90);
  return (
    <h6 className="lg:text-md border-t border-neutral-100 px-2 py-1 text-xs text-white">
      {articleTitle}
    </h6>
  );
};

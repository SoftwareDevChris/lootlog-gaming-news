import Link from "next/link";
import Image from "next/image";

import { LatestSectionTitleDefault } from "./LatestSectionTitleDefault";
import { LatestSectionTitleSpotlight } from "./LatestSectionTitleSpotlight";

import { TArticle } from "@/types/types";

export const LatestSectionItem: React.FC<{
  isSpotlight?: boolean;
  noFlex?: boolean;
  article: TArticle;
}> = ({ isSpotlight, noFlex, article }) => {
  return (
    <article
      className={`relative aspect-16/9 rounded-xl bg-neutral-800 hover:bg-teal-500 ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link className="bg-inherit" href={`/article/${article.id}`}>
        <Image
          className="aspect-16/9 object-cover object-center"
          alt=""
          src={article?.image_url ?? "/images/placeholder.webp"}
          fill
          sizes="1000px"
        />
        <div className="absolute bottom-0 left-0 z-10 w-full bg-inherit">
          {isSpotlight ? (
            <LatestSectionTitleSpotlight title={article?.title} />
          ) : (
            <LatestSectionTitleDefault title={article?.title} />
          )}
        </div>
      </Link>
    </article>
  );
};

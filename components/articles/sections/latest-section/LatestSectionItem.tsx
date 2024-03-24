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
      className={`article-section-item relative aspect-16/9 ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link className="bg-inherit" href={`/article/${article?.id}`}>
        <Image
          className="aspect-16/9 rounded-b-xl object-cover object-center"
          alt=""
          src={article?.image[0]?.url ?? "/images/placeholder.webp"}
          fill
          sizes="1000px"
        />
        <div className="absolute bottom-0 z-10 w-full rounded-b-xl bg-inherit">
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

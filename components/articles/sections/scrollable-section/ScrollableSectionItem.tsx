import Link from "next/link";
import Image from "next/image";

// Types
import { TArticle } from "@/types/types";

// Lib
import { shortenTitle } from "@/lib/title-shortener";
import { convertDate } from "@/lib/date-converter";

type Props = {
  noFlex?: boolean;
  article: TArticle;
};

export const ScrollableSectionItem: React.FC<Props> = ({ noFlex, article }) => {
  const articleTitle = shortenTitle(article.title, 70);
  const articleDate = convertDate(article.created_at);

  return (
    <article
      className={`article-section-item relative flex w-full flex-col rounded-xl sm:w-[calc(322px-6px)] ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link href={`/article/${article.id}`} className="flex flex-grow flex-col">
        <div className="relative aspect-3/2">
          <Image
            className="object-cover object-center"
            alt=""
            src={article.image[0].url ?? "/images/placeholder.webp"}
            fill
            sizes="1000px"
          />
          <div className="absolute left-4 top-4">
            <span className="rounded-xl bg-neutral-900/50 px-2 py-1 text-xs text-white">
              {articleDate}
            </span>
          </div>
        </div>

        <div className="article-section-item-title flex flex-grow border-t border-t-neutral-50 p-2 text-sm font-light text-white">
          <h6>{articleTitle}</h6>
        </div>
      </Link>
    </article>
  );
};

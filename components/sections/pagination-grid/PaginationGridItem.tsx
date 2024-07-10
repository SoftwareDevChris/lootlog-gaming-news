import Link from "next/link";
import Image from "next/image";
import { TArticle } from "@/types/types";
import { convertDate } from "@/lib/date-converter";

type Props = {
  article: TArticle;
};

export const PaginationGridItem: React.FC<Props> = ({ article }) => {
  const articleDate = convertDate(article.createdAt);

  return (
    <article
      className={`article-section-item relative flex w-full flex-col overflow-hidden rounded-xl`}
    >
      <Link href={`/article/${article.id}`} className="flex flex-grow flex-col">
        <div className="relative aspect-3/2">
          <Image
            className="object-cover object-center"
            alt=""
            src={article.image?.url ?? "/images/placeholder.jpg"}
            fill
            sizes="1000px"
          />
          <div className="absolute left-4 top-4">
            <span className="rounded-xl bg-neutral-900/50 px-2 py-1 text-xs text-neutral-100">
              {articleDate}
            </span>
          </div>
        </div>

        <div className="article-section-item-title flex flex-grow border-t border-t-neutral-50 p-2 text-sm font-light text-neutral-100">
          <h6>{article.title}</h6>
        </div>
      </Link>
    </article>
  );
};

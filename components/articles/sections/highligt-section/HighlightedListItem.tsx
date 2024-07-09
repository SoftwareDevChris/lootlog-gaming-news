import { FC } from "react";
import "./HighlightSection.scss";

import { TArticle } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: TArticle;
  withBorder?: boolean;
};

export const HighlightedListItem: FC<Props> = ({ article, withBorder }) => {
  return (
    <>
      <Link
        href={`/article/${article.id}`}
        className={`highlighted-list-item ${withBorder && "with-border"}`}
      >
        <div className="title-area">
          <h2>{article.title}</h2>
        </div>
        <div className="image-area">
          <Image
            fill
            src={article.image?.url ?? "/public/images/placeholder.webp"}
            alt={article.title}
          />
        </div>
      </Link>
    </>
  );
};

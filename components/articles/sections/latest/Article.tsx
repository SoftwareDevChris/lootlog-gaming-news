import Link from "next/link";
import Image from "next/image";

import { TitleDefault } from "./TitleDefault";
import { TitleSpotlight } from "./TitleSpotlight";

import { TArticleContent } from "@/utils/types";

export const Article: React.FC<{
  isSpotlight?: boolean;
  noFlex?: boolean;
  content: TArticleContent;
}> = ({ isSpotlight, noFlex, content }) => {
  return (
    <article
      className={`relative aspect-16/9 rounded-xl ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link href="/article">
        <Image
          className="aspect-16/9 object-cover object-center"
          alt=""
          src="/images/placeholder.webp"
          fill
          sizes="1000px"
        />
        <div className="absolute bottom-0 left-0 w-full">
          {isSpotlight ? (
            <TitleSpotlight title={content.title} />
          ) : (
            <TitleDefault title={content.title} />
          )}
        </div>
      </Link>
    </article>
  );
};

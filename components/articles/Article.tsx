import Link from "next/link";
import Image from "next/image";

import { ArticleTitleDefault } from "./titles/ArticleTitleDefault";
import { ArticleTitleSpotlight } from "./titles/ArticleTitleSpotlight";

export const Article: React.FC<{
  isSpotlight?: boolean;
  title?: string;
  noFlex?: boolean;
}> = ({ isSpotlight, title, noFlex }) => {
  return (
    <article
      className={`relative aspect-16/9 ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link href="/article">
        <Image
          className="aspect-16/9 object-cover object-center"
          alt=""
          src="/images/placeholder.webp"
          fill
        />
        <div className="absolute bottom-0 left-0 w-full">
          {isSpotlight ? <ArticleTitleSpotlight /> : <ArticleTitleDefault />}
        </div>
      </Link>
    </article>
  );
};

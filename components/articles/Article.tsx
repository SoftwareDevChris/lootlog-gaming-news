import Link from "next/link";
import Image from "next/image";

import { TArticleContent } from "@/types/types";

export const Article: React.FC<{
  noFlex?: boolean;
  content: TArticleContent;
}> = ({ noFlex, content }) => {
  const limitTitleLength =
    content.title.length > 50
      ? content.title.substring(0, 84) + "..."
      : content.title;

  return (
    <article
      className={`relative flex w-full flex-col rounded-xl bg-neutral-800 hover:bg-teal-500 sm:w-[320px] ${
        noFlex ? "flex-none" : "flex-initial"
      } overflow-hidden`}
    >
      <Link href="/article" className="flex flex-grow flex-col">
        <div className="aspect-3/2 relative">
          <Image
            className="object-cover object-center"
            alt=""
            src="/images/placeholder.webp"
            fill
            sizes="1000px"
          />
          <div className="absolute left-4 top-4">
            <span className="rounded-xl bg-neutral-900/50 px-2 py-1 text-xs text-white">
              {content.date.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-grow border-t border-t-neutral-50 p-2 text-sm font-light text-white">
          <h6>{limitTitleLength}</h6>
        </div>
      </Link>
    </article>
  );
};

import Link from "next/link";
import Image from "next/image";

import { TArticleContent } from "@/utils/Types";
import { SlideTitle } from "./SlideTitle";

export const Slide: React.FC<{ content: TArticleContent }> = ({ content }) => {
  return (
    <Link href={`/articles/${content.id}`}>
      <article className="relative aspect-16/9 overflow-hidden">
        <Image
          className="aspect-16/9 object-cover object-center"
          alt=""
          src="/images/placeholder.webp"
          fill
          sizes="1300px"
        />
        <div className="text-md absolute bottom-0 left-0 z-10 mb-2 w-full px-4 text-center sm:mb-10  md:mb-16 md:px-40 ">
          <SlideTitle title={content.title} />
        </div>
      </article>
    </Link>
  );
};

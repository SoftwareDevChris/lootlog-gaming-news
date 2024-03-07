import Link from "next/link";
import Image from "next/image";

import { TArticle } from "@/types/types";
import { SlideTitle } from "./SlideTitle";

export const Slide: React.FC<{ article: TArticle }> = ({ article }) => {
  return (
    <Link href={`/article/${article.id}`}>
      <article className="relative aspect-16/9 overflow-hidden bg-transparent">
        <Image
          className="aspect-16/9 object-cover object-center"
          alt=""
          src={article.image_url}
          fill
          sizes="1300px"
        />
        <div className="text-md absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-neutral-900 px-8 py-4 text-center text-white sm:px-20 sm:py-6 md:px-40 md:py-12 lg:py-16">
          <SlideTitle title={article.title} />
        </div>
      </article>
    </Link>
  );
};

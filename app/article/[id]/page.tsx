import Image from "next/image";

// Queries
import { getArticleById } from "@/lib/queries";

// HTML Parser
import parse from "html-react-parser";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { status, statusText, article } = await getArticleById(params.id);

  if (status !== 200 || !article) {
    return (
      <div className="mx-auto flex min-h-[500px] flex-col items-center justify-center text-neutral-100">
        <h1>Error</h1>
        <p>{statusText}</p>
      </div>
    );
  }

  return (
    <article className="article-page relative mx-auto flex w-full max-w-[1300px] flex-grow flex-col p-2 text-neutral-100 md:p-8">
      {/* Title */}
      <h1 className="my-8 text-4xl font-bold">{article!.title}</h1>

      {/* Author */}
      <div className="flex flex-col justify-between space-y-1 py-1 text-xs uppercase sm:flex-row sm:space-y-0 sm:text-sm">
        <p className="text-neutral-100">
          <span className="font-bold text-neutral-400">By</span>{" "}
          {article?.author?.firstName + " " + article?.author?.lastName}
        </p>
        <p className="text-neutral-100">
          <span className="font-bold text-neutral-400">Published</span>{" "}
          {article?.created_at.toDateString()}
        </p>
      </div>

      {/* Image */}
      <div className="relative mx-auto aspect-16/9 w-full">
        <Image
          className="object-cover object-center"
          alt=""
          src={article!.image[0].url}
          fill
          sizes="1000px"
        />
      </div>

      {/* Content */}
      <div className="py-2">{parse(article!.content)}</div>
    </article>
  );
}

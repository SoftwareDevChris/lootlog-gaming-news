import "./MyArticlesPage.scss";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/sessionService";
import { getAllArticlesByUser } from "@/lib/articleService";

import { ArticleTable } from "@/components/tables/ArticleTable";

export default async function MyArticlesPage() {
  const session = await getSession();

  if (!session) redirect("/");

  const userArticles = await getAllArticlesByUser(session?.user.id);

  return (
    <div className="my-articles-page">
      <h1>My articles</h1>

      <div>
        {!userArticles.articles ||
          (userArticles.articles.length < 1 && (
            <p>{"You haven't written any articles yet."}</p>
          ))}

        {userArticles.articles && userArticles.articles.length > 0 ? (
          <ArticleTable articles={userArticles.articles} />
        ) : null}
      </div>
    </div>
  );
}

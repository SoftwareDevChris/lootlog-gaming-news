import "./MyArticlesPage.scss";

import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

import { getArticlesByUser } from "@/lib/queries";
import { ArticleTable } from "@/components/tables/ArticleTable";

export default async function MyArticlesPage() {
  const clerkUser = await currentUser();

  const userArticles = await getArticlesByUser(clerkUser!.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

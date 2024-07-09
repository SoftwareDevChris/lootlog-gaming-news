import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { getAllArticles, getArticleById } from "@/lib/articleService";
import { getSession } from "@/lib/sessionService";
import { TArticle } from "@/types/types";
import { redirect, useParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default async function EditArticlePage() {
  const session = await getSession();

  if (session?.user.role !== "AUTHOR") {
    if (session?.user.role !== "ADMIN") redirect("/");
  }

  // const [articleToEdit, setArticleToEdit] = useState<TArticle | null>(null);

  // const searchParams = useParams() as { id: string };

  // const getArticle = useCallback(async () => {
  //   const res = await getArticleById(parseInt(searchParams.id));

  //   if (res.status === 200 && res.article) {
  //     setArticleToEdit(res.article);
  //   }
  // }, [searchParams.id]);

  // useEffect(() => {
  //   if (!articleToEdit) {
  //     getArticle();
  //   }
  // }, [articleToEdit, getArticle]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* <ArticleForm existingArticle={articleToEdit} /> */}
    </Suspense>
  );
}

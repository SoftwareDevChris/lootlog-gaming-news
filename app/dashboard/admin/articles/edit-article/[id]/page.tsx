import { getArticleById } from "@/lib/articleService";

// Components
import { CreateArticleForm } from "@/components/forms/articleForms/createArticleForm/CreateArticleForm";
import { TCategory } from "@/types/types";

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  // Get the article ID passed via the URL
  const articleId = params.id;
  if (!articleId) {
    return null;
  }

  // Get the article to edit
  const articleToEdit = await getArticleById(parseInt(params.id));
  if (articleToEdit.status !== 200) {
    return null;
  }

  return (
    <div className="h-full w-full pl-2 md:pl-8">
      <CreateArticleForm
        category={articleToEdit.article?.category as TCategory}
      />
    </div>
  );
}

// Queries
import { getArticleById, getArticleCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/CreateArticleForm";

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
  const articleToEdit = await getArticleById(articleId);
  if (articleToEdit.status !== 200) {
    return null;
  }

  // Get the categories to display in the form
  const categories = await getArticleCategories();
  if (categories.status !== 200) {
    return null;
  }

  return (
    <div className="h-full w-full pl-2 md:pl-8">
      <CreateArticleForm
        categories={categories.categories}
        existingArticle={articleToEdit.article}
      />
    </div>
  );
}

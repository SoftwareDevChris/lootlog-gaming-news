// Queries
import { getAllCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/articleForms/createArticleForm/CreateArticleForm";
import { getSession } from "@/lib/sessionService";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { ArticleFormSelect } from "@/components/forms/articleForms/ArticleFormSelect";

export default async function CreateArticlePage() {
  const session = await getSession();

  if (session?.user.role !== "AUTHOR") {
    if (session?.user.role !== "ADMIN") redirect("/");
  }

  const categories = await getAllCategories();

  if (!categories.categories) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ArticleFormSelect categories={categories.categories} />
    </Suspense>
  );
}

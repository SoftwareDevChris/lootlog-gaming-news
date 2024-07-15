import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getAllCategories } from "@/lib/queries";
import { getSession } from "@/lib/sessionService";

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

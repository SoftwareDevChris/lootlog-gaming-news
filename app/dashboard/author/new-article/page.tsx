import { Suspense } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { getAllCategories } from "@/lib/queries";
import { getSession } from "@/lib/session";

import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

const DynamicFormSelect = dynamic(() =>
  import("../../../../components/forms/articleForms/ArticleFormSelect").then(
    (mod) => mod.ArticleFormSelect
  )
);

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
      {/* <ArticleFormSelect categories={categories.categories} /> */}
      <DynamicFormSelect categories={categories.categories} />
    </Suspense>
  );
}

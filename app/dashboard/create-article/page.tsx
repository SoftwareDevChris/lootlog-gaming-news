import { Suspense } from "react";

// Queries
import { getArticleCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/dashboard/editor/CreateArticleForm";
import { LoadingSpinner } from "@/components/ui/loading";

const LoadingFallback = () => {
  return (
    <div className="h-full w-full items-center justify-center">
      <div className="h-20 w-20">
        <LoadingSpinner theme="orange" />
      </div>
    </div>
  );
};

export default async function CreateArticlePage() {
  const categories = await getArticleCategories();

  if (categories.status !== 201) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="h-full w-full pl-2 md:pl-8">
        <CreateArticleForm categories={categories.categories} />
      </div>
    </Suspense>
  );
}

// Queries
import { getArticleCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/CreateArticleForm";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";

export default async function CreateArticlePage() {
  const categories = await getArticleCategories();

  if (!categories.categories) {
    return <OverlayLoading />;
  }

  return (
    <div className="h-full w-full pl-2 md:pl-8">
      <CreateArticleForm categories={categories.categories} />
    </div>
  );
}

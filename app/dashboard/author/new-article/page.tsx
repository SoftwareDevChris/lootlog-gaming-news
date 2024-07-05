// Queries
import { getAllCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/createArticleForm/CreateArticleForm";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";

export default async function CreateArticlePage() {
  const categories = await getAllCategories();

  if (!categories.categories) {
    return <OverlayLoading />;
  }

  return (
    <>
      <CreateArticleForm categories={categories.categories} />
    </>
  );
}

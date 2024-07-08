// Queries
import { getAllCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/createArticleForm/CreateArticleForm";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";
import { getSession } from "@/lib/sessionService";
import { redirect } from "next/navigation";

export default async function CreateArticlePage() {
  const session = await getSession();

  if (!session) redirect("/");

  const categories = await getAllCategories();

  if (!categories.categories) {
    return <OverlayLoading />;
  }

  return (
    <>
      <CreateArticleForm categories={categories.categories} article={null} />
    </>
  );
}

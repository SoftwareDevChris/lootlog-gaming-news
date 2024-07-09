// Queries
import { getAllCategories } from "@/lib/queries";

// Components
import { CreateArticleForm } from "@/components/forms/createArticleForm/CreateArticleForm";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";
import { getSession } from "@/lib/sessionService";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function CreateArticlePage() {
  const session = await getSession();

  if (session?.user.role !== "AUTHOR") {
    if (session?.user.role !== "ADMIN") redirect("/");
  }

  const categories = await getAllCategories();

  if (!categories.categories) {
    return <OverlayLoading />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <CreateArticleForm categories={categories.categories} />
    </Suspense>
  );
}

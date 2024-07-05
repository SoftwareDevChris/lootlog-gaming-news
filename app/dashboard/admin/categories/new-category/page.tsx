import "./NewCategoryPage.scss";

import { CreateCategoryForm } from "@/components/forms/createCategoryForm/CreateCategoryForm";

export default function NewCategoryPage() {
  return (
    <>
      <h1>New category</h1>

      <CreateCategoryForm />
    </>
  );
}

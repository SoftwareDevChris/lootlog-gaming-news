"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import "./CreateArticleForm.scss";

// Types
import { TCategory } from "@/types/types";

// Components
import { Label } from "../../ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";
import { ArticleEditor } from "@/components/editor/ArticleEditor";

// Queries
import { createArticle } from "@/lib/articleService";

// Toast
import toast from "react-hot-toast";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { resizeImage } from "@/lib/resize-image";

type Props = {
  categories: TCategory[];
};

export const CreateArticleForm: React.FC<Props> = ({ categories }) => {
  const [categoryId, setCategoryId] = useState("");
  const [body, setBody] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleCreateNewArticle = async (formData: FormData) => {
    setErrorMessage("");
    setIsLoading(true);

    // Resize the image and put in back into the formData
    const resizedImage = await resizeImage(formData.get("image") as File);
    formData.set("image", resizedImage.image as File);

    const res = await createArticle(formData, {
      body: body,
      categoryId: parseInt(categoryId),
    });

    if (res.status === 201) {
      toast.success("Article has been created", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
      window.scrollTo(0, 0);
    }
  };

  // If the editor is not loaded yet, show a loading overlay
  if (ArticleEditor === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div className="form-wrapper">
      <h1>Create article</h1>
      {errorMessage && <p className="form-error-message">{errorMessage}</p>}
      <form action={handleCreateNewArticle} className="create-article-form">
        {/* Title */}
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input required name="title" />
        </div>

        <div className="input-group">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input required name="subtitle" />
        </div>

        {/* Category */}
        <div className="input-group">
          <Label>Category</Label>
          <Select
            categories={categories}
            onSelect={(cg) => setCategoryId(cg.id.toString())}
          />
        </div>

        {/* Image */}
        <div className="input-group">
          <Label>{"Select image (1300x732 or above)"}</Label>
          <Input name="image" required type="file" accept="image/*" />
        </div>

        {/* Content */}
        <div className="input-group">
          <Label>Article body</Label>
          <ArticleEditor onChange={(text) => setBody(text)} />
        </div>

        {/* Save */}
        <Button
          aria-disabled={isLoading}
          disabled={isLoading}
          type="submit"
          className="button btn-primary"
        >
          <span>Create</span>
        </Button>
      </form>
    </div>
  );
};

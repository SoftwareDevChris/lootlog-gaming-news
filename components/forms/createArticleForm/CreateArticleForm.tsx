"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./CreateArticleForm.scss";

// Types
import { TArticle, TCategory } from "@/types/types";

// Components
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { ArticleEditor } from "@/components/editor/ArticleEditor";
import { Select } from "@/components/ui/select/Select";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";
import { Label } from "../../ui/label/Label";

// Queries
import { createArticle, updateArticle } from "@/lib/queries";
import { resizeImage } from "@/lib/resize-image";
import { LoadingSpinner } from "../../ui/loading/LoadingSpinner";

// Toast
import toast from "react-hot-toast";

type Props = {
  categories: TCategory[] | null;
  existingArticle?: TArticle | null;
};

export const CreateArticleForm: React.FC<Props> = ({
  categories,
  existingArticle,
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // If the article is being edited, set the content of the editor
    if (existingArticle) {
      setTitle(existingArticle.title);
      setImage(existingArticle.image!.url ?? null);
      setContent(existingArticle.body);
    }
  }, [existingArticle]);

  const onSubmit = async (formData: FormData) => {
    toast.dismiss();
    setIsLoading(true);

    // If the user is not editing an existing article,
    // resize the image before sending it to the server
    if (!existingArticle) {
      const resize = await resizeImage(formData.get("image") as File);
      resize.image && formData.set("image", resize.image);
    }

    try {
      // If the user is editing an existing article
      if (existingArticle) {
        const updateExistingArticle = updateArticle.bind(null, content);
        const res = await updateExistingArticle(
          formData,
          existingArticle.image!,
          existingArticle.id,
        );

        if ((res.status = 200)) {
          toast.success("Article updated successfully", {
            icon: "🎉",
            duration: 4000,
          });
          router.push("/dashboard/articles");
        }
      }
      // If the user is creating a new article
      else {
        const createNewArticle = createArticle.bind(null, {
          content: content,
          categoryId: categoryId ?? 0,
        });
        const res = await createNewArticle(formData);

        if ((res.status = 201)) {
          toast.success("Article has been created", {
            icon: "🎉",
            duration: 4000,
          });
          router.push("/dashboard/author/my-articles");
        }
      }
    } catch (error) {
      console.error(error);
      toast("Failed to create article", { icon: "❌" });
    } finally {
      setIsLoading(false);
    }
  };

  // If the editor is not loaded yet, show a loading overlay
  if (ArticleEditor === undefined) {
    return <OverlayLoading message="Loading editor..." />;
  }

  return (
    <div>
      {/* Form */}
      <h1>Create article</h1>
      <form action={onSubmit} className="create-article-form">
        {/* Title */}
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            name="title"
            placeholder="Catchy title goes here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="input-group">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            required
            name="subtitle"
            placeholder="Catchy title goes here"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
          />
        </div>

        {/* Category */}
        <div className="input-group">
          <Label>Category</Label>
          <Select
            categories={categories}
            onSelect={(cg) => setCategoryId(cg.id)}
          />
        </div>

        {/* Image */}
        <div className="input-group">
          <Label>{"Select image (1300x732 or above)"}</Label>
          {!image ? (
            <Input name="image" required type="file" accept="image/*" />
          ) : (
            <div className="image-preview-container">
              <div className="absolute z-10 h-full w-full items-center justify-center bg-neutral-900/50">
                <Button
                  onClick={() => setImage(null)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-100 text-neutral-900 hover:bg-neutral-300"
                >
                  Remove image
                </Button>
              </div>
              <Image src={image ? image : ""} alt="Article image" fill />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="input-group">
          <Label>Article body</Label>
          <ArticleEditor
            onChange={(text) => setContent(text)}
            articleBody={existingArticle ? existingArticle.body : ""}
          />
        </div>

        {/* Save */}
        <Button
          aria-disabled={isLoading}
          disabled={isLoading}
          type="submit"
          className="mt-4 bg-blue-950"
        >
          {isLoading ? (
            <LoadingSpinner theme="orange" />
          ) : existingArticle ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </div>
  );
};

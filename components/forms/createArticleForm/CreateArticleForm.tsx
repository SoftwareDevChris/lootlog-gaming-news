"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./CreateArticleForm.scss";

// Types
import { TArticle, TCategory } from "@/types/types";

// Components
import { Label } from "../../ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";
import { ArticleEditor } from "@/components/editor/ArticleEditor";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";

// Queries
import { createArticle, updateArticle } from "@/lib/articleService";
import { resizeImage } from "@/lib/resize-image";
import { LoadingSpinner } from "../../ui/loading/LoadingSpinner";

// Toast
import toast from "react-hot-toast";

type Props = {
  categories: TCategory[] | null;
  article?: TArticle | null;
};

export const CreateArticleForm: React.FC<Props> = ({ categories, article }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [body, setBody] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    // If the article is being edited, set the content of the editor
    if (article) {
      setTitle(article.title);
      setImage(article.image!.url ?? null);
      setBody(article.body);
    }
  }, [article]);

  const onSubmit = (formData: FormData) => {
    if (article) handleUpdateArticle(formData);
    else handleCreateNewArticle(formData);
  };

  const handleCreateNewArticle = async (formData: FormData) => {
    setErrorMessage("");
    setIsLoading(true);

    const createNewArticle = createArticle.bind(null, {
      body: body,
      categoryId: categoryId!,
    });
    const res = await createNewArticle(formData);

    if (res.status === 201) {
      toast.success("Article has been created", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
    }
  };

  const handleUpdateArticle = async (formData: FormData) => {
    setErrorMessage("");
    setIsLoading(true);

    const updatearticle = updateArticle.bind(null, {
      body: body,
      categoryId: categoryId!,
      previousImage: article?.image!,
    });
    const res = await updatearticle(formData);

    if (res.status === 200) {
      toast.success("Article updated successfully", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
    }
  };

  // If the editor is not loaded yet, show a loading overlay
  if (ArticleEditor === undefined) {
    return <OverlayLoading message="Loading editor..." />;
  }

  return (
    <div className="form-wrapper">
      {/* Form */}
      <h1>Create article</h1>
      {errorMessage && <p className="form-error-message">{errorMessage}</p>}
      <form action={onSubmit} className="create-article-form">
        {/* Title */}
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="input-group">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            required
            name="subtitle"
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
            onChange={(text) => setBody(text)}
            articleBody={article ? article.body : ""}
          />
        </div>

        {/* Save */}
        <Button
          aria-disabled={isLoading}
          disabled={isLoading}
          type="submit"
          className="button btn-primary"
        >
          {isLoading ? (
            <LoadingSpinner size="small" theme="orange" />
          ) : article ? (
            <span>Update</span>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </div>
  );
};

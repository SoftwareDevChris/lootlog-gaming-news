"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Types
import { TArticle, TCategory } from "@/types/types";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleEditor } from "@/components/editor/ArticleEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OverlayLoading } from "@/components/overlays/OverlayLoading";

// Queries
import { createArticle, updateArticle } from "@/lib/queries";
import { resizeImage } from "@/lib/resize-image";
import { LoadingSpinner } from "../ui/loading";

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
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // If the article is being edited, set the content of the editor
    if (existingArticle) {
      setTitle(existingArticle.title);
      setCategory(existingArticle.category?.name ?? "");
      setImage(existingArticle.image[0].url ?? null);
      setContent(existingArticle.content);
    }
  }, [existingArticle]);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    toast.loading("Creating article...", {
      icon: "📝",
      id: "toast-loading",
    });

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
          existingArticle.image,
          existingArticle.id!,
        );

        if ((res.status = 200)) {
          toast.dismiss("toast-loading");
          toast.success("Article updated successfully", {
            icon: "🎉",
            duration: 5000,
          });
          router.push("/dashboard");
        }
      }
      // If the user is creating a new article
      else {
        const createNewArticle = createArticle.bind(null, content);
        const res = await createNewArticle(formData);

        if ((res.status = 201)) {
          toast.dismiss("toast-loading");
          toast.success("Article updated successfully", {
            icon: "🎉",
            duration: 5000,
          });
          router.push("/dashboard");
        }
      }
    } catch (error) {
      toast.dismiss("toast-loading");
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
    <div className="h-full">
      {/* Form */}
      <h1 className="mb-4 text-2xl font-bold">Create a new article</h1>
      <form action={onSubmit}>
        {/* Title */}
        <div className="space-y-1 pb-2">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <Input
            required
            name="title"
            placeholder="Catchy title goes here"
            className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Category */}
        <div className="space-y-1 pb-2">
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <Select required name="category">
            <SelectTrigger className="w-[180px] outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder={"Select category"} />
            </SelectTrigger>
            <SelectContent>
              {categories!.map((option) => (
                <SelectItem
                  key={option.id}
                  onChange={() => setCategory(option.id.toString())}
                  value={option.id.toString()}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image */}
        <div className="space-y-1 pb-2">
          <label htmlFor="image" className="text-sm">
            {"Select image (1300x732 or above)"}
          </label>
          {!image ? (
            <Input
              name="image"
              required
              type="file"
              accept="image/*"
              className="cursor-pointer pt-2"
            />
          ) : (
            <div className="relative aspect-16/9 h-40">
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
        <span className="bg-transparent text-sm">Content</span>
        <div className="mt-1 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
          <ArticleEditor
            onChange={(text) => setContent(text)}
            articleBody={existingArticle ? existingArticle.content : ""}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Types
import { TCategory } from "@/types/types";

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
import { OverlayError } from "@/components/overlays/OverlayError";
import { OverlaySuccess } from "@/components/overlays/OverlaySuccess";

// Queries
import { createArticle } from "@/lib/queries";
import { resizeImage } from "@/lib/resize-image";
import { LoadingSpinner } from "../ui/loading";

type Props = {
  categories: TCategory[] | null;
};

export const CreateArticleForm: React.FC<Props> = ({ categories }) => {
  const [content, setContent] = useState("");

  const [submitStatus, setSubmitStatus] = useState<
    "submitting" | "error" | "success" | null
  >(null);

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    setSubmitStatus("submitting");
    // Resize the image before sending it to the server
    const resize = await resizeImage(formData.get("image") as File);

    if (resize.image) {
      formData.set("image", resize.image);
    } else {
      setSubmitStatus("error");
      return;
    }

    // Send the article's content to the server along with the form data
    const createNewArticle = createArticle.bind(null, content);
    const res = await createNewArticle(formData);

    if (res.status !== 201) {
      setSubmitStatus("error");
      return;
    } else {
      setSubmitStatus("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      return;
    }
  };

  // If the editor is not loaded yet, show a loading overlay
  if (ArticleEditor === undefined) {
    return <OverlayLoading message="Loading editor..." />;
  }

  return (
    <div className="h-full">
      {/* Overlays */}
      {submitStatus === "submitting" ? (
        <OverlayLoading message="Creating article..." />
      ) : null}
      {submitStatus === "error" ? (
        <OverlayError message="Failed to create article" />
      ) : null}
      {submitStatus === "success" ? (
        <OverlaySuccess message="Article created successfully" />
      ) : null}

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
          />
        </div>

        {/* Category */}
        <div className="space-y-1 pb-2">
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <Select required name="category">
            <SelectTrigger className="w-[180px] outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories!.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
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
          <Input
            name="image"
            required
            type="file"
            accept="image/*"
            className="cursor-pointer pt-2"
          />
        </div>

        {/* Content */}
        <span className="bg-transparent text-sm">Content</span>
        <div className="mt-1 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
          <ArticleEditor onChange={(text) => setContent(text)} />
        </div>

        {/* Save */}
        <Button
          aria-disabled={submitStatus !== null ? true : false}
          disabled={submitStatus !== null ? true : false}
          type="submit"
          className="mt-4 bg-blue-950"
        >
          {submitStatus === "submitting" ? (
            <LoadingSpinner theme="orange" />
          ) : (
            "Create article"
          )}
        </Button>
      </form>
    </div>
  );
};

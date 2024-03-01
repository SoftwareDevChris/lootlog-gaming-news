"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Types
import { TCategory } from "@/types/types";

// Zod
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { ArticleEditor } from "./ArticleEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Queries
import { createArticle } from "@/lib/queries";
import { resizeImage } from "@/lib/resize-image";
import { Label } from "@radix-ui/react-select";

type Props = {
  categories: TCategory[] | null;
};

export const CreateArticleForm: React.FC<Props> = ({ categories }) => {
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    // Resize the image before sending it to the server
    const resize = await resizeImage(formData.get("image") as File);
    if (resize.image) {
      formData.set("image", resize.image);
    }

    // Send the article's content to the server along with the form data
    const createNewArticle = createArticle.bind(null, content);
    const res = await createNewArticle(formData);

    if (res.status !== 200) {
      setStatusMessage(res.statusText);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setStatusMessage("Article created successfully");
    router.push("/dashboard");
  };

  if (!categories) {
    return null;
  }

  return (
    <>
      {statusMessage && (
        <div className="w-full">
          <p className="text-center">{statusMessage}</p>
        </div>
      )}
      <form action={onSubmit}>
        {/* Title */}
        <div className="pb-2">
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
        <div className="pb-2">
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <Select required name="category">
            <SelectTrigger className="w-[180px] outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image */}
        <div className="pb-2">
          <label htmlFor="image" className="text-sm">
            Select image
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
        <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 pb-2">
          <ArticleEditor onChange={(txt) => setContent(txt)} />
        </div>

        {/* Save */}
        <Button
          aria-disabled={isSubmitting}
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-600"
        >
          Save
        </Button>
      </form>
    </>
  );
};

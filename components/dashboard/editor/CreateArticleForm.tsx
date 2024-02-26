"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Types
import { TCategory } from "@/types/types";

// Zod
import { z } from "zod";
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

type Props = {
  categories: TCategory[] | null;
};

export const CreateArticleForm: React.FC<Props> = ({ categories }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const router = useRouter();

  // Schema
  const formSchema = z.object({
    title: z.string().min(10, { message: "Title is too short" }),
    category: z.string().max(1, { message: "Category is required" }),
    content: z.string().min(100, { message: "Content is too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const onSubmitArticle = async (values: z.infer<typeof formSchema>) => {
    const create = await createArticle({
      title: values.title,
      categoryId: parseInt(values.category),
      content: values.content,
    });

    if (create.error || !create.data) {
      setStatusMessage(
        create.error ??
          "An error occurred. Please try again or contact support.",
      );
      return;
    }

    setStatusMessage("Article created successfully");
    setTimeout(() => {
      router.push(`/dashboard`);
    }, 3000);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitArticle)}>
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mt-2 space-y-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Catchy title goes here"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormMessage className="text-xs">
            {form.formState.errors.title?.message}
          </FormMessage>

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mt-2 space-y-1">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px] outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormMessage className="text-xs">
            {form.formState.errors.category?.message}
          </FormMessage>

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-2 space-y-1">
                <FormLabel htmlFor="content">Content</FormLabel>
                <FormControl>
                  <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
                    <ArticleEditor onChange={field.onChange} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormMessage className="text-xs">
            {form.formState.errors.content?.message}
          </FormMessage>

          {/* Save */}
          <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-600">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

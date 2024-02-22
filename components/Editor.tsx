"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Types
import { TCategory } from "@/types/types";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
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

type Props = {
  categories: TCategory[] | null;
};

export const Editor: React.FC<Props> = ({ categories }) => {
  // Schema
  const formSchema = z.object({
    title: z.string().min(10, { message: "Title is too short" }),
    category: z.enum(["", ...categories!.map((category) => category.name)]),
    content: z.string().min(100, { message: "Content is too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const editor = useEditor({
    content: "<p>Hello World! 🌍️</p>",
    extensions: [StarterKit],
  });

  const onSubmitArticle = (values: z.infer<typeof formSchema>) => {
    console.log("article:", values);
  };

  if (!categories) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitArticle)}>
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
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-2 space-y-1">
              <FormLabel htmlFor="content">Content</FormLabel>
              <FormControl>
                <div className="overflow-hidden rounded-md border border-neutral-500 bg-neutral-100">
                  <EditorContent onChange={field.onChange} editor={editor} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-600">
          Save
        </Button>
      </form>
    </Form>
  );
};

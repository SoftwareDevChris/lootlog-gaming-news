"use client";

import { Button } from "@/components/ui/button";
import { getArticleCategories } from "@/lib/queries";
import { TCategory } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitArticle = () => {
    console.log("title:", title);
    console.log("content:", content);
  };

  // const getCategories = useCallback(async () => {
  //   const categories = await getArticleCategories();

  //   if (categories.data && !categories.error) {
  //     setCategories(categories.data);
  //   } else if (categories.error) {
  //     setErrorMessage(categories.error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getCategories();
  // }, [getCategories]);

  const editorModules = {
    toolbar: [
      [{ header: [2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const editorFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div>
      <div className="my-4">
        {/* Title */}
        <label htmlFor="title" className="text-neutral-900">
          Article title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-neutral-500 bg-neutral-100 p-2 text-neutral-900 focus:outline-none"
          placeholder="Catchy clickbait title goes here..."
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="text-neutral-900">
          Article content
        </label>
        <div className="mt-1 overflow-hidden rounded-md border border-neutral-500 bg-neutral-100">
          <Quill
            theme="snow"
            id="content"
            value={content}
            onChange={(val) => setContent(val)}
            placeholder="Write something awesome..."
            preserveWhitespace
            modules={editorModules}
            formats={editorFormats}
            className="h-[70svh] md:h-[50vh]"
          />
        </div>
      </div>

      <Button
        onClick={submitArticle}
        className="mt-4 bg-blue-600 hover:bg-blue-600"
      >
        Save
      </Button>
    </div>
  );
};

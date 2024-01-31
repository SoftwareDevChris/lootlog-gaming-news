"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");

  const submitArticle = () => {
    console.log("title:", title);
    console.log("content:", content);
  };

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
        <label htmlFor="title" className="mb-2 text-neutral-100">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-neutral-500 bg-neutral-100 p-2 text-neutral-900 focus:outline-none"
          placeholder="Enter title..."
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="mb-2 text-neutral-100">
          Content
        </label>
        <div className="overflow-hidden rounded-md border border-neutral-500 bg-neutral-100">
          <ReactQuill
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
        Submit
      </Button>
    </div>
  );
};

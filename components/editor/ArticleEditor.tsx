"use client";

import "./Editor.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import { ArticleEditorToolbar } from "./ArticleEditorToolbar";

type Props = {
  onChange: (content: string) => void;
  articleBody?: string;
};

export const ArticleEditor: React.FC<Props> = ({ onChange, articleBody }) => {
  // TipTap Editor
  const editor = useEditor({
    content: articleBody || "Write something awesome!",
    parseOptions: {
      preserveWhitespace: "full",
    },
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class:
              "border-l-4 border-neutral-400 bg-neutral-300 px-2 py-1 w-fit",
          },
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "hover:underline text-blue-500 italic",
        },
        openOnClick: false,
        autolink: true,
      }).extend({
        inclusive: false,
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-2 w-full border-input ",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div id="editor" className="bg-neutral-100">
      <ArticleEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { ArticleEditorToolbar } from "./ArticleEditorToolbar";

type Props = {
  onChange: (content: string) => void;
};

export const ArticleEditor: React.FC<Props> = ({ onChange }) => {
  // TipTap Editor
  const editor = useEditor({
    content: "Write something awesome!",
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-2xl font-bold",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "border-l-4 border-neutral-400 bg-neutral-300 px-2 py-1 w-fit",
          },
        },
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

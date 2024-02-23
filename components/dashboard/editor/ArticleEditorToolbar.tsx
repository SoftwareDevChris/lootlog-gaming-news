"use client";

import { Toggle } from "@radix-ui/react-toggle";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  MessageSquareQuote,
  List,
  ListOrdered,
  Heading2,
  Heading3,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export const ArticleEditorToolbar: React.FC<Props> = ({ editor }) => {
  const iconSize = 18;

  if (!editor) return null;

  return (
    <div className="flex w-full space-x-6 border-b border-neutral-200 bg-neutral-100 p-2">
      {/* -------- */}
      {/* Headings */}
      {/* -------- */}
      <div className="flex space-x-2">
        <Toggle
          className=""
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={iconSize} />
        </Toggle>
        <Toggle
          className=""
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={iconSize} />
        </Toggle>
      </div>

      {/* -------------------------------- */}
      {/* Bold, Strike, Italic, Blockquote */}
      {/* -------------------------------- */}
      <div className="flex space-x-2">
        <Toggle
          className=""
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={iconSize} />
        </Toggle>
        <Toggle
          className=""
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={iconSize} />
        </Toggle>
        <Toggle
          className=""
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={iconSize} />
        </Toggle>
        <Toggle
          className=""
          pressed={editor.isActive("block")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <MessageSquareQuote size={iconSize} />
        </Toggle>
      </div>

      {/* ----- */}
      {/* Lists */}
      {/* ----- */}
      <div className="flex space-x-2">
        <Toggle
          className=""
          pressed={editor.isActive("list")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={18} />
        </Toggle>
        <Toggle
          className=""
          pressed={editor.isActive("list")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={18} />
        </Toggle>
      </div>
    </div>
  );
};

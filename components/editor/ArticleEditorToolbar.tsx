"use client";
import { useCallback, useState } from "react";

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
  Link,
  Unlink,
  WrapText,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export const ArticleEditorToolbar: React.FC<Props> = ({ editor }) => {
  const iconSize = 18;

  const setLink = useCallback(() => {
    const previousLink = editor?.getAttributes("link").href;
    const url = window.prompt("Paste link here", previousLink);

    // Cancelled
    if (!url) return;

    // Empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex w-full space-x-6 border-b border-neutral-200 bg-neutral-100 p-2">
      <div className="flex space-x-2">
        {/* Heading 2 */}
        <Toggle
          className={
            editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
          }
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={iconSize} />
        </Toggle>
        {/* Heading 3 */}
        <Toggle
          className={
            editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
          }
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={iconSize} />
        </Toggle>
      </div>

      <div className="flex space-x-2">
        {/* Bold */}
        <Toggle
          className={editor.isActive("bold") ? "text-blue-500" : ""}
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={iconSize} />
        </Toggle>
        {/* Strike */}
        <Toggle
          className={editor.isActive("strike") ? "text-blue-500" : ""}
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={iconSize} />
        </Toggle>
        {/* Italic */}
        <Toggle
          className={editor.isActive("italic") ? "text-blue-500" : ""}
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={iconSize} />
        </Toggle>
        {/* Blockquote */}
        <Toggle
          className={editor.isActive("block") ? "text-blue-500" : ""}
          pressed={editor.isActive("block")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <MessageSquareQuote size={iconSize} />
        </Toggle>
      </div>
      {/* Link & unlink */}
      <div className="flex space-x-2">
        <Toggle
          onClick={setLink}
          className={editor.isActive("link") ? "text-blue-500" : ""}
        >
          <Link size={iconSize} />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <Unlink size={iconSize} />
        </Toggle>
      </div>
      {/* New Line */}
      {/* <Toggle
        className={editor.isActive("newline") ? "text-blue-500" : ""}
        pressed={editor.isActive("newline")}
        onPressedChange={() => editor.chain().focus().setHardBreak().run()}
      >
        <WrapText size={iconSize} />
      </Toggle> */}

      {/* ----- */}
      {/* Lists */}
      {/* ----- */}
      <div className="flex space-x-2">
        <Toggle
          className={editor.isActive("list") ? "text-blue-500" : ""}
          pressed={editor.isActive("list")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={18} />
        </Toggle>
        <Toggle
          className={editor.isActive("list") ? "text-blue-500" : ""}
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

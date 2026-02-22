"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { useEffect } from "react";
import { defaultExtensions } from "@/lib/tiptap/extensions";
import { RichTextToolbar } from "./toolbar";
import { cn } from "@/lib/utils";

export type RichTextEditorProps = {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
};

export function RichTextEditor({
  content = "",
  onChange,
  className,
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: defaultExtensions,
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[120px] px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div
      className={cn(
        "rounded-md border bg-background overflow-hidden",
        className
      )}
    >
      <RichTextToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export type { Editor };

"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function Editor({
  initialContent,
  setContent
  }:{
  initialContent:any,
  setContent: (content: PartialBlock[]) => void;
}) {
  const editor = useCreateBlockNote({initialContent});

  return (
    <div
      className="editor-wrapper  border rounded-lg min-h-[60vh] cursor-text py-4 mt-4 z-50"
      onClick={() => editor.focus()}
    >
      <BlockNoteView editor={editor} theme="light"  onChange={()=>setContent(editor.document)}/>
    </div>
  );
}
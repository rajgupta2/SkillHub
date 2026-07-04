"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function Editor({
  initialContent,
  isEditable,
  setContent
  }:{
  initialContent:any,
  isEditable:boolean;
  setContent: (content: PartialBlock[]) => void;
}) {
  const editor = useCreateBlockNote({initialContent});

  return (
    <div
      className={`editor-wrapper ${isEditable ? 'border shadow-2xl' : ''} rounded-lg min-h-[60vh] cursor-text z-50`}
      onClick={() => editor.focus()}
    >
      <BlockNoteView editor={editor} theme="light" editable={isEditable} onChange={()=>setContent(editor.document)}/>
    </div>
  );
}

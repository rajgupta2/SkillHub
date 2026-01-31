import { BlockNoteEditor } from "@blocknote/core";
import type { PartialBlock } from "@blocknote/core";

export async function convertBlockNoteToHTML(
  blocks: PartialBlock[] | null
) {
  if (!blocks) return "";

  const editor = BlockNoteEditor.create({
    initialContent: blocks,
  });
  const html=await editor.blocksToHTMLLossy(blocks);
  return html;
}

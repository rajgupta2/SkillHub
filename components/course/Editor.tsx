import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import type { BlockNoteEditor } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Save,
} from "lucide-react";
import './styles.scss'
import { useEffect, useState } from "react";
import type {  PartialBlock } from "@blocknote/core";
import { getLocalCourseById, saveLocalCourse } from "@/lib/course-idb";
import { useSearchParams } from "next/navigation";


export default function Editor({
  initialContent,
}: {
  initialContent?: any;
}) {
  const searchParams=useSearchParams();
  const courseId  = searchParams.get("courseId");
  const linkId  = searchParams.get("linkId");
  const [content, setContent] = useState< PartialBlock[] | null>(null);
  const [isEditable,setIsEditable]=useState(false);

  const editor = useCreateBlockNote({
    initialContent:
      initialContent && Array.isArray(initialContent)
        ? initialContent
        : [
            {
              type: "paragraph",
              content: [],
            },
          ],
  });

  return (
  <div className=" mx-auto px-6">
    <div className="flex justify-end">
      {
        !isEditable
        ?
          <Button
          className="mb-4 bg-blue-600 cursor-pointer"
          onClick={() => setIsEditable(true)}
          >
            <Pencil/> Edit Content
          </Button>
        :
          <Button
            className="mb-4 bg-green-600 cursor-pointer"
            onClick={() =>{
              updateLinkContent(courseId!, linkId!, content!);
              setIsEditable(false)
            }}
          >
            <Save/> Save Content
          </Button>
      }
    </div>
    <div
      className={`editor-wrapper ${isEditable ? 'border' : ''} rounded-lg min-h-[60vh] cursor-text`}
      onClick={() => editor.focus()}
    >
      <BlockNoteView editor={editor} theme="light" editable={isEditable} onChange={()=>setContent(editor.document)}/>
    </div>
  </div>
  );
}

export async function fetchServerCourses(id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function updateLinkContent(
  localCourseId: string,
  linkId: string,
  content: PartialBlock[]
) {
  let course = await getLocalCourseById(localCourseId);
  if (!course){
    const serverCourse=await fetchServerCourses(localCourseId);
    course=serverCourse;
    course!.localCourseId=serverCourse._id;
  }
  if(!course){
      console.log("Course neither found locally nor in server. while saving.")
      return;
  }
  const link = course.links.find(l => l.linkId === linkId);
  if (!link) return;

  link.content = content;
  if(course.status==="published")  course.status = "edited";

  await saveLocalCourse(course);
}
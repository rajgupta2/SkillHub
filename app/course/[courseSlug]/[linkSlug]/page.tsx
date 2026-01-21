"use client";

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
import { usePathname, useSearchParams } from "next/navigation";
import { useCourse } from "../../CourseContext";
import React from "react";
import { generateCourseSlug } from "@/components/slugify";

export default function Page({params}:{
  params:any
}){
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState< PartialBlock[] | null>(null);
  const param:{courseSlug:string,linkSlug:string}=React.use(params);
  const courseSlug=param.courseSlug;
  const linkSlug=param.linkSlug;
  const {course,setCourse}=useCourse();
  useEffect(() => {
    (async () => {
      if(!course) return;
      const link = course.links.find((l:any) => generateCourseSlug(l.title) === linkSlug);
      setContent(link?.content ?? [{ type: "heading", content: ["Start Typing..."]}]);
      setLoading(false);
    })();
  }, [course]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading content...
      </div>
    );
  }

  return (
    <Editor initialContent={content} params={params}/>
  );

}

export function Editor({
  params,
  initialContent
  }:{
  params:any,
  initialContent:any
}) {
  const [content, setContent] = useState< PartialBlock[]>(initialContent);
  const [isEditable,setIsEditable]=useState(false);
  const param:{courseSlug:string,linkSlug:string}=React.use(params);
  const courseSlug=param.courseSlug;
  const linkSlug=param.linkSlug;
  const {course,setCourse}=useCourse();

  const editor = useCreateBlockNote({initialContent});

  async function updateLinkContent() {
    if (!course) return;

    const updatedLinks = course.links.map(link => {
      const slug = generateCourseSlug(link.title);

      if (slug === linkSlug) {
        link.content=content;
      }
      return link;
    });

    const updatedCourse = {
      ...course,
      links:updatedLinks,
      status: course.status === "published" ? "edited" : course.status,
    };

    await saveLocalCourse(updatedCourse);
    setCourse(updatedCourse);
  }

  async function updateServerContent(){
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;
    const links=course?.links.filter((l)=>generateCourseSlug(l.title)===linkSlug)
    const updateLink=links![0];
    updateLink.content=content;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}/${linkSlug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({updateLink}),
      }
    );
    console.log(res.json());
    if (!res.ok) {
      throw new Error("Failed to update course content");
    }
  }

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
              //updateServerContent();
              updateLinkContent();
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

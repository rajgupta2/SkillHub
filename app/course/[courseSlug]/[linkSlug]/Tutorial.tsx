"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Pencil,
  Save,
} from "lucide-react";
import './styles.scss'
import { useEffect, useState } from "react";
import type { PartialBlock } from "@blocknote/core";
import { saveLocalCourse } from "@/lib/course-idb";
import { useParams } from "next/navigation";
import { useCourse } from "../CourseContext";
import { generateCourseSlug } from "@/components/slugify";
import Link from "next/link";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function Tutorial() {
  const [isEditable,setIsEditable]=useState(false);
  const param:{courseSlug:string,linkSlug:string}=useParams();
  const courseSlug=param.courseSlug;
  const linkSlug=param.linkSlug;
  const [isCourseOwner,setCourseOwner]=useState<boolean>(false);
  const {course,setCourse}=useCourse();

  useEffect(()=>{
    async function isOwner(){
      if(!course) return;
      if(isCourseOwner) return;
      const isLoggedIn=localStorage.getItem("isLoggedIn");
      if(isLoggedIn!== "true") return;

      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/iscourseowner/${course.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourseOwner(data.isOwner);
    }
    isOwner();
  },[course]);

  let link = course?.links.find((l:any) => generateCourseSlug(l.title) === linkSlug);
  const [content, setContent] = useState< PartialBlock[]>(link?.content ?? [{ type: "heading", content: ["Start Typing..."]}]);
  const nextLinkCollection = course?.links.filter(
    (l: any) => l.order === (link?.order ?? 0) + 1
  );
  const nextLink = (nextLinkCollection && nextLinkCollection.length > 0) ? nextLinkCollection[0] : null;
  const [editorKey, setEditorKey] = useState(0);
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
    if (!res.ok) {
      throw new Error("Failed to update course content");
    }
  }

  useEffect(()=>{
    let link = course?.links.find((l:any) => generateCourseSlug(l.title) === linkSlug);
    if (link?.content) {
      setContent(link.content);
      setEditorKey((k) => k + 1);
    }
  },[course]);

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
            className="mb-4 bg-green-600 hover:bg-green-700 text-white cursor-pointer mr-4"
            onClick={() =>{
              //updateServerContent();
              updateLinkContent();
              setIsEditable(false)
            }}
          >
            <Save/> {isCourseOwner? "Save Local" : "Save Content"}
          </Button>
      }
      {
        isEditable && isCourseOwner && (
        <Button
          className="mb-4 bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
          onClick={() =>{
            updateServerContent();
            setIsEditable(false)
          }}
        >
          <Save/> Save at Server
        </Button>
      )}
    </div>

    <Editor
      key={editorKey}
      initialContent={content}
      isEditable={isEditable}
      setContent={(content) =>
        setContent(content )
      }
    />

    {
      nextLink && (
      <div className="flex justify-end">
        <Link
          href={`/course/${course?.slug}/${generateCourseSlug(nextLink.title)}`}
          className="
            group inline-flex items-center gap-2 mx-6
            rounded-lg px-4 py-2
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white
            shadow-md hover:shadow-lg
            transition-all duration-300
            hover:from-blue-700 hover:to-indigo-700
          "
        >
          Next Lesson
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight/>
          </span>
        </Link>
      </div>
      )
    }

  </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseLayout from "@/components/course/CourseLayout";
import Editor from "@/components/course/Editor";
import type {  PartialBlock } from "@blocknote/core";
import { CourseDB } from "@/lib/db";
import { getLocalCourseById } from "@/lib/course-idb";

export async function fetchServerCoursesById(courseId:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}


export default function CourseDetailPage() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseDB["courses"]["value"]>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState< PartialBlock[] | null>(null);

  const searchParams=useSearchParams();
  const courseId  = searchParams.get("courseId");
  const linkId  = searchParams.get("linkId");
  const isServerCourse=searchParams.get("server") || "false";

  useEffect(() => {
    (async () => {
      if(!courseId) return router.push("/course");
      const data = isServerCourse==="true" ? await fetchServerCoursesById(courseId)  : await getLocalCourseById(courseId);

      if (!data) return router.push("/course");
      if(!data.localCourseId) data.localCourseId=data._id;
      setCourse(data);

      const link = data?.links.find((l:any) => l.linkId === linkId);
      setContent(link?.content ?? [{ type: "heading", content: ["Start Typing..."]}]);
      setLoading(false);
    })();
  }, [searchParams]);


  if (loading || !course) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading course...
      </div>
    );
  }

  return (
    <CourseLayout course={course} isServerCou={isServerCourse}>
        <Editor initialContent={content}/>
    </CourseLayout>
  );
}



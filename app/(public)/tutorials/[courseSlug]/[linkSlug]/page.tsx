import { Metadata } from "next";
import { generateCourseSlug } from "@/components/slugify";
import Tutorial from "./Tutorial";
import { cookies } from "next/headers";
import CourseProvider from "../CourseProvider";
import { convertBlockNoteToHTML } from "@/components/article/blocknoteToHtml";
import type {  PartialBlock } from "@blocknote/core";
import { UICourse } from "@/lib/courseSchema";

export async function generateMetadata({
    params,
  }: {
    params:{ courseSlug: string; linkSlug: string };
  }): Promise<Metadata> {
  const parameters=await params;
  const courseSlug=parameters.courseSlug
  const linkSlug=parameters.linkSlug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`);
  let course:UICourse | null=null;
  if(res.status===200) course=await res.json();
  const tutorial= course?.links.find((l:any)=>generateCourseSlug(l.title)===linkSlug);

  if (!course || !tutorial) {
    return {
      title: "SkillHub Tutorial",
      description: "This tutorial is not published or no longer available on server.",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const keywords = [
    "SkillHub Tutorial",
    `${course.title}`,
    `${tutorial.title}`,
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  return {
    title: `${tutorial.title} ${course.title}`,
    description: tutorial.title,
    keywords,
    openGraph: {
      title: `${tutorial.title} ${course.title}`,
      description: tutorial.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}/${linkSlug}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tutorial.title} ${course.title}`
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutorial.title} ${course.title}`,
      description: tutorial.title,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

export default async function Page({params}:{
    params:{courseSlug:string;linkSlug:string;};
}){
  const cookieStore = await cookies();
  const isLoggedIn:boolean = cookieStore.get("user")?.value ? true :false;

  const parameters= await params;
  const courseSlug = parameters.courseSlug;
  const linkSlug  = parameters.linkSlug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`);
  let course:UICourse=await res.json();;

  return (
    <CourseProvider isLoggedIn={isLoggedIn} serverCourse={course}>
      <Tutorial/>
    </CourseProvider>
  );
}

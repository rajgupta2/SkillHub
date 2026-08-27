import PublishPage from "./Publish";
import CourseProvider from "./CourseProvider";
import type { Metadata } from "next";
import { UICourse } from "@/types/types";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
    params,
  }: {
  params: {
    courseSlug:string;
  };
}): Promise<Metadata> {
  const parameters= await params;
  const courseSlug = parameters.courseSlug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseSlug}`);
  let course:UICourse=await res.json();

  const keywords = [
    "SkillHub Tutorial",
    `${course.title}`,
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  return {
    title: course.title,
    description: course.description,
    keywords,
    openGraph: {
      title: course.title,
      description: course.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${course.title}`
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title}`,
      description: course.description,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

export default async function Page({params}:{
    params:{courseSlug:string};
}){
  const parameters= await params;
  const courseSlug = parameters.courseSlug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseSlug}`);
  if(res.status===404) return notFound();

  const course = await res.json();
  if(res.status===200 && course.links.length>0){
    return redirect(`/tutorials/${courseSlug}/${course.links[0].slug}`);
  }

  return (
    <CourseProvider serverCourse={course}>
        <PublishPage/>
    </CourseProvider>
  );
}
import { Metadata } from "next";
import Tutorial from "./Tutorial";
import { cookies } from "next/headers";
import CourseProvider from "../CourseProvider";
import { Tutorial as TutorialType, UICourse } from "@/types/types";
import { notFound } from "next/navigation";
import Unauthorized from "@/app/(public)/unauthorized/page";

export async function generateMetadata({
    params,
  }: {
    params:{ courseSlug: string; linkSlug: string };
  }): Promise<Metadata> {
  const parameters=await params;
  const courseSlug=parameters.courseSlug
  const linkSlug=parameters.linkSlug;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let res;
  if(token){
   res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/tutorial/draft/${courseSlug}/${linkSlug}`,
     {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     },
   );
  }else{
   res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/tutorial/${courseSlug}/${linkSlug}`,
   );
  }
  if(res.status!==200) return {};
  const data=await res.json();
  const tutorial: TutorialType = data.tutorial;

  const keywords = [
    "SkillHub Tutorial",
    `${tutorial.title}`,
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  return {
    title: tutorial.title,
    description: tutorial.courseSlug + tutorial.slug,
    keywords,
    openGraph: {
      title: tutorial.title,
      description: tutorial.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}/${linkSlug}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: tutorial.title
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.title,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

export default async function Page({params}:{
    params:{courseSlug:string;linkSlug:string;};
}){
  const parameters = await params;
  const courseSlug = parameters.courseSlug;
  const linkSlug = parameters.linkSlug;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let res;
  if (token) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutorial/draft/${courseSlug}/${linkSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } else {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutorial/${courseSlug}/${linkSlug}`,
    );
  }
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseSlug}`);
  if(res.status===404 || res2.status===404) return notFound();

  const data = await res.json();
  const course: UICourse = await res2.json();

  return (
    <CourseProvider serverCourse={course}>
      {res.status === 401 ? (
        <Unauthorized/>
      ) : (
        <Tutorial
          t={data.tutorial}
          statusCode={res.status}
          isTutorialOwner={data.isTutorialOwner}
        />
      )}
    </CourseProvider>
  );
}

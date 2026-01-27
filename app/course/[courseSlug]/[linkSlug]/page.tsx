import { Metadata } from "next";
import { generateCourseSlug } from "@/components/slugify";

async function fetchServerCoursesBySlug(courseSlug:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.status===200 ? (await res.json()) : null;
}

export async function generateMetadata({
    params,
  }: {
    params:any;
  }): Promise<Metadata> {
  const parameters=await params;
  const courseSlug=parameters.courseSlug
  const linkSlug=parameters.linkSlug;
  const course=await fetchServerCoursesBySlug(courseSlug);
  const tutorial= course?.links.find((l:any)=>generateCourseSlug(l.title)===linkSlug);

  if (!course) {
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
    `${course.title} ${tutorial.title}`,
    tutorial.description,
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  return {
    title: `${course.title} ${tutorial.title} | SkillHub`,
    description: tutorial.description || `${course.title} ${tutorial.title}`,
    keywords,
    openGraph: {
      title: `${course.title} ${tutorial.title}`,
      description: tutorial.description || `${course.title} ${tutorial.title}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}/${linkSlug}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${course.title} ${tutorial.title}`
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} ${tutorial.title}`,
      description: tutorial.description || `${course.title} ${tutorial.title}`,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

import Tutorial from "./Tutorial";

export default async function TutorialPage() {
  return <Tutorial/>
}

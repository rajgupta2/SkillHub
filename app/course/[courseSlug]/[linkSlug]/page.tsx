import { Metadata } from "next";


export async function getTutorial(endPoint: string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endPoint}`);
  if(res.status===404) return null;
  const tutorial = await res.json();
  return tutorial;
}

export async function generateMetadata({
    params,
  }: {
    params:any;
  }): Promise<Metadata> {
  const parameters=await params;
  const courseSlug=parameters.courseSlug
  const linkSlug=parameters.linkSlug;
  const tutorial= await getTutorial(`/courses/slug/${courseSlug}/${linkSlug}`);

  if (!tutorial) {
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
    tutorial.title,
    tutorial.description,
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  return {
    title: `${tutorial.title} | SkillHub`,
    description: tutorial.description || tutorial.title,
    keywords,
    openGraph: {
      title: `${tutorial.title}`,
      description: tutorial.description || tutorial.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}/${linkSlug}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: tutorial.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutorial.title}`,
      description: tutorial.description || tutorial.title,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

import Tutorial from "./Tutorial";

export default async function MaterialPage() {
  return <Tutorial/>
}

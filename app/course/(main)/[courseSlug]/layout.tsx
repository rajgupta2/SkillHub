import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { cookies } from "next/headers";
import {wakeupBackendServer} from "@/app/run";
import CourseProvider from "./CourseProvider";
import { CourseDB } from "@/lib/db";
import { generateCourseSlug } from "@/components/slugify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
    params,
  }: {
  params: {
    courseSlug:string;
  };
}): Promise<Metadata> {
  const parameters=await params;
  const courseSlug = parameters.courseSlug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`);
  let course:CourseDB["courses"]["value"] | null=null;
  if(res.status===200) course=await res.json();

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
    "Last minute tutorial",
    "Fast revision tutorial",
    "interview questions",
    "SkillHub",
  ].filter(Boolean);

  const linkSlug=generateCourseSlug(course.links[0].title);

  return {
    title: `${course.title}`,
    description: course.description,
    keywords,
    openGraph: {
      title: `${course.title}`,
      description: course.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/course/${courseSlug}/${linkSlug}`,
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

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    courseSlug: string;
  };
}>) {
  const cookieStore = await cookies();
  const isLoggedIn:boolean = cookieStore.get("user")?.value ? true :false;
  //wakeupBackendServer();

  const parameters=await params;
  const courseSlug = parameters.courseSlug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`);
  let course:CourseDB["courses"]["value"] | null=null;
  if(res.status===200) course=await res.json();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/graduation-cap.svg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CourseProvider isLoggedIn={isLoggedIn} serverCourse={course}>
          {children}
        </CourseProvider>
      </body>

    </html>
  );
}

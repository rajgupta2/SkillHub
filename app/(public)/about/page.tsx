import { Metadata } from "next";
import AboutPage from "./AboutPage"

export const metadata:Metadata = {
  title: "About SkillHub – Empowering Students to Learn, Share & Grow",
  description:
    "SkillHub is a modern platform designed for students to share achievements, explore study materials, attend events, and grow as young developers and learners.",
  keywords: [
    "About SkillHub",
    "Student platform",
    "study resources",
    "college students",
    "achievements",
    "events and workshops",
    "student community",
    "tech learning platform"
  ],
  openGraph: {
    title: "About SkillHub – Empowering Students",
    description:
      "Discover the story behind SkillHub, a student-driven platform that helps learners grow through study resources, events, and achievements.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    siteName: "SkillHub",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About SkillHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SkillHub – Empowering Students",
    description:
      "Learn how SkillHub supports students with resources, achievements, events, and tech-driven community features.",
    images: ["/og-about.png"],
  },
};

export default function Page(){
  return <AboutPage/>
}
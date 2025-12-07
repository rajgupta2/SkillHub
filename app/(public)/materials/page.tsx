import { Metadata } from "next";
import MaterialPage from "./Materials";

export const metadata:Metadata = {
  title: "SkillHub – Student Materials, Projects, PYQs & Notes",
  description:
    "Explore a collection of study materials, projects, PYQs, assignments, and notes on SkillHub to enhance your learning and skills.",
  keywords: [
    "student materials",
    "SkillHub PYQs",
    "college projects",
    "study notes",
    "assignments",
    "SkillHub resources",
    "college learning"
  ],
  openGraph: {
    title: "SkillHub – Study Materials & Projects",
    description:
      "Find and download PYQs, assignments, project reports, and notes on SkillHub to boost your learning.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/materials`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Materials Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub – Student Materials & Resources",
    description:
      "Download PYQs, assignments, project reports, and notes from SkillHub to improve your skills.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export default function Page(){
  return <MaterialPage/>
}

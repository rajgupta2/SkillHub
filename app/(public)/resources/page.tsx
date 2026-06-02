import { Metadata } from "next";
import MaterialPage from "./Materials";

export const metadata:Metadata = {
  title: "SkillHub – Student Materials, Projects, PYQs & Notes",
  description:
    "Explore a collection of study materials, projects, PYQs, assignments, and notes of any college on SkillHub to enhance your learning and skills.",
  keywords: [
    "student materials",
    "College PYQs",
    "college projects",
    "collge study notes",
    "college assignments",
    "SkillHub resources",
    "college learning",
    "Tutorials",
    "Blogs",
    "Articles"
  ],
  openGraph: {
    title: "SkillHub – Study Materials & Projects",
    description:
      "Find and download PYQs, assignments, project reports, and notes of any college on SkillHub to boost your learning.",
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
      "Download PYQs, assignments, project reports, and notes of any college from SkillHub to improve your skills.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  description: string;
  uploadedBy: {
    name: string;
  };
  createdAt: string;
  files: {
    id:number,
    originalName:string,
    url: string,
    contentType:string
    materialId: number;
   }[];
  studentId: string;
  collegeId: number | null;
}


export default async function Page(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material?limit=150`);
  if (!res.ok) {
    return <div className="text-center text-gray-500 py-10">Failed to fetch resources.</div>;
  }

  const data = await res.json();
  const materials=data.materials as Material[];
  return <MaterialPage materials={materials}/>
}

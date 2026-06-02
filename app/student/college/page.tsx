"use server"
import { GET } from "@/app/api/find-token/route";
import College from "./College";

async function getCollege(){
  const tokenRes = await GET();
  const dataToken = await tokenRes.json();
  const token=dataToken.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/college`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.college;
}

export async function generateMetadata() {
  const college = await getCollege();

  if (!college) {
    return {
      title: "SkillHub – College & Student Resources",
      description:
        "Explore SkillHub’s collection of study materials, projects, assignments, and reports for your college. Access verified student resources and enhance learning.",
        keywords: [
          "student materials",
          "SkillHub PYQs",
          "college projects",
          "study notes",
          "assignments",
          "SkillHub resources",
          "college learning"
        ],
    };
  }

  const { name, city, district, state } = college;

  const pageTitle = `${name} – Study Materials, Notes, Assignments & Projects | SkillHub`;
  const pageDescription = `Download study materials, notes, previous year papers, assignments, and project resources for ${name}, located in ${city}, ${district}, ${state}. SkillHub helps students access trusted and high-quality academic content.`;

  const pageKeywords = [
    name,
    `${name} study materials`,
    `${name} notes`,
    `${name} assignments`,
    `${name} projects`,
    `${name} previous year papers`,
    `${name} resources`,
    `${name} student portal`,
    `${city} colleges`,
    `${district} colleges`,
    `${state} colleges`,
    `college study materials`,
    "SkillHub student resources",
  ];

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/student/resources`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${name} Resources on SkillHub`,
        },
      ],
      type: "website",
      locale: "en_US",
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

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
  const tokenRes = await GET();
  const dataToken = await tokenRes.json();
  const token=dataToken.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/college-resources?limit=50`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return <div className="text-center text-gray-500 py-10">Failed to fetch materials.</div>;
  }

  const data = await res.json();
  const materials=data.materials as Material[];
  return <College materials={materials}/>
}
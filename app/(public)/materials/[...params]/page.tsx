import { Metadata } from "next";

interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  description: string;
  uploadedBy: { name: string };
  createdAt: string;
  files:{
    id: number;
    originalName: string;
    url: string;
    contentType: string;
    materialId: number;
  }[];
  studentId: string | null;
  collegeId: number | null;
}

export async function getMaterial(id: string): Promise<Material> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material/${id}`);
  const data = await res.json();
  return data.material;
}

export async function generateMetadata({
    params,
  }: {
    params:any;
  }): Promise<Metadata> {
  const parameters=await params;
  const id=parameters.params[1];
  const material = await getMaterial(id);

  const keywords = ["SkillHub", "student material", material.type, material.subject,material.title,material.description];

  return {
    title: `${material.title} – ${material.type} | SkillHub`,
    description: material.description || material.title,
    keywords,
    openGraph: {
      title: `${material.title} – ${material.type} | SkillHub`,
      description: material.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/materials/${material.title}/${material.id}`,
      siteName: "SkillHub",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: material.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${material.title} – ${material.type} | SkillHub`,
      description: material.description,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

import SingleMaterialPage from "./SingleMaterial";

export default async function MaterialPage() {
  return <SingleMaterialPage />
}

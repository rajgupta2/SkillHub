import { Metadata } from "next";
import { Material } from "../page";

export async function getMaterial(id: string): Promise<Material> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material/${id}`);
  const data = await res.json();
  return data.material;
}

export async function generateMetadata({
    params,
  }: {
    params: { params: string[] };
  }): Promise<Metadata> {
  const slugArray = await params;
  const parameters=await slugArray.params;
  const subjectSlug = parameters[0];  // first part
  const id = parameters[1];           // second part
  const material = await getMaterial(id) as Material;

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

export default async function MaterialPage({
    params,
  }:
  {
    params: { params: string[] };
}){
  const slugArray = await params;
  const parameters=await slugArray.params;
  const subjectSlug = parameters[0];  // first part
  const id = parameters[1];           // second part
  const material = await getMaterial(id) as Material;
  if(!material)
    return <div className="p-10 text-center text-gray-600">Material not found.</div>

  return <SingleMaterialPage material={material}/>
}

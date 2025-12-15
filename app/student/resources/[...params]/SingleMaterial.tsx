"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilesPreview, { SingleFilePreview } from "@/components/FilesPreview";

interface Material {
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
    id: number;
    originalName: string;
    url: string;
    contentType: string;
    materialId: number;
  }[];
  studentId: string | null;
  collegeId: number | null;
}


export default function SingleMaterialPage() {
  const para:{params:string[]} = useParams();
  const params:string[]=para.params;
  const id=params[1];
  const isFile=params[2] && params[2].includes("file");
  const router = useRouter();

  const [material, setMaterial] = useState<Material>();
  const [loading, setLoading] = useState(true);

  const searchParams=useSearchParams();
  const fileurl=searchParams.get("fileurl") || null;
  // ---------------------------
  // Fetch material by ID
  // ---------------------------
  useEffect(() => {
    async function materialLoad() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/material/${id}`
        );
        const data = await res.json();
        setMaterial(data.material);
      } catch (error) {
        console.error("Error loading material", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) materialLoad();
  }, [id]);

  // ---------------------------
  // Share handler
  // ---------------------------
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: material?.title,
          text: "Check this material",
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">Loading...</div>
    );
  }

  if (!material) {
    return (
      <div className="p-10 text-center text-red-600">Material not found.</div>
    );
  }

  if(material.files.length===1){
    return <SingleFilePreview presignedUrl={material.files[0].url} onClose={()=>router.push("/student/resources")} />
  }

  if(isFile)
    return <SingleFilePreview presignedUrl={fileurl!} onClose={()=>router.push(`/student/resources/${material.title.split(" ").join("-")}/${material.id}`)} />

  return <FilesPreview material={material} onClose={()=>router.push("/student/resources")}/>

}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilesPreview from "@/components/FilesPreview";
import { SingleFilePreview } from "@/components/FilesPreview";
import { generateCourseSlug } from "@/components/slugify";
import { Material } from "../page";

export default function SingleMaterialPage({material}:{material:Material}) {
  const para:{params:string[]} = useParams();
  const params:string[]=para.params;
  const id=params[1]; //materialId
  const isFile=params[2] && params[2].includes("file");
  const router = useRouter();

  const searchParams=useSearchParams();
  const fileurl=searchParams.get("fileurl") || "";

  // Share handler
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

  if(material.files.length===1){
    return <SingleFilePreview presignedUrl={material.files[0].url} onClose={()=>router.push("/materials")} />
  }

  if(isFile)
   return <SingleFilePreview presignedUrl={fileurl!} onClose={()=>router.push(`/materials/${generateCourseSlug(material.title)}/${material.id}`)} />

  return <FilesPreview material={material} onClose={()=>router.push("/materials")}/>
}

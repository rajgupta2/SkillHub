"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilesPreview from "@/components/FilesPreview";
import { SingleFilePreview } from "@/components/FilesPreview";
import { generateCourseSlug } from "@/components/slugify";
import { Material } from "../page";

export default function SingleMaterialPage({material}:{material:Material}) {
  const { params } = useParams<{ params: string[] }>();
  const router = useRouter();

  const id=params[1]; //materialId
  const isFile=(params[2] && params[2].includes("file")) ? true: false;

  const searchParams=useSearchParams();
  const fileurl=searchParams.get("fileurl") || "";

  if(material?.files?.length===1){
    return <SingleFilePreview presignedUrl={material.files[0].url} onClose={() => router.back()} />;
  }

  if(isFile)
   return <SingleFilePreview presignedUrl={fileurl!} onClose={() => router.back()} />;

  return <FilesPreview material={material} onClose={() => router.back()}/>;
}

"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilesPreview,{ SingleFilePreview } from "@/components/FilesPreview";
import { Material } from "@/types/types";

export default function SingleMaterialPage({material}:{material:Material}) {
  const { params } = useParams<{ params: string[] }>();
  const router = useRouter();

  const id=params[1]; //materialId
  const isFile=(params[2] && params[2].includes("file")) ? true: false;

  const searchParams=useSearchParams();
  const fileurl=searchParams.get("fileurl") || "";

  if(material?.files?.length===1 || isFile){
    return <SingleFilePreview file={material.files[0]} materialTitle={material.title} onClose={() => router.back()}  />;
  }

  return <FilesPreview material={material} onClose={() => router.back()}/>;
}

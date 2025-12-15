"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FileIcon, Eye, Loader2, X, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { formateDate } from "@/components/formateDate";
import Link from "next/link";


const handleShare = async (url:string,title:string) => {

  if (navigator.share) {
    try {
      await navigator.share({
        title:title,
        text: "View this resource",
        url,
      });
    } catch (e) {
      console.log("Share cancelled");
    }
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }
};


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
const getPreviewElement = (url:string,height?:string) => {
  //const url = previewUrls[file.id]; //for presigned url
  if (!url) return null;
  const ext = url.split(".").pop()!.toLowerCase();
  const isSmall = height === "h-48"; // grid preview
  const isLarge = !isSmall;          // single modal view

  // ----------- IMAGE -----------
  if (["png", "jpg", "jpeg", "webp"].includes(ext)) {
    return (
      <img
        src={url}
        className={
          isSmall
            ? "w-full h-[680px] object-cover rounded-xl" // grid preview
            : "max-w-full object-contain rounded-xl" // full preview
        }
      />
    );
  }

   // ----------- PDF -----------
  if (ext === "pdf") {
    return (
      <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${url}`}
        className={
          isSmall
            ? "w-full h-48 pointer-events-none rounded-xl border" // small card, disabled scroll
            : "w-full h-[680px] rounded-xl border" // modal view scroll inside iframe
        }
      />
    );
  }

   // ----------- DOCX / PPTX -----------
  return (
    <iframe
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
      className={
        isSmall
          ? "w-full h-48 rounded-xl border" // thumbnail, no scroll
          : "w-full h-[680px] rounded-xl border shadow-sm bg-white" // modal scroll
      }
    />
  );

};
export function SingleFilePreview({
  presignedUrl,
  onClose,
}: {
  presignedUrl: string;
  onClose: () => void;
}){
  return (
    <div className=" mx-8 mt-6 border rounded-xl shadow p-4 bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">File Preview</h3>
        <button
          onClick={onClose}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
       <div className="overflow-hidden">
        {getPreviewElement(presignedUrl,"h-[700px]")}
      </div>
    </div>
  )
}

export default function FilesPreview({
  material,
  onClose,
}: {
  material: Material;
  onClose: () => void;
}) {

  const title=material.title.split(" ").join("-");
  const pathname=usePathname();
  return (
    <div className="p-6 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white shadow p-2 rounded-full hover:bg-gray-100"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">{material.title}</h1>
      <p className="text-gray-500">
        {material.subject} • {material.type}
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Uploaded by {material.uploadedBy.name} • {formateDate(material.createdAt)}
      </p>

      <div className="absolute top-16 right-4">
        <button
          onClick={()=>{handleShare(`${window.location.origin}/materials/${title}/${material.id}`,material.title)}}
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2
                    rounded-md hover:bg-blue-700 transition shadow-sm mt-2 md:mt-0
                    w-fit text-sm"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {material.files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-2xl shadow-md border hover:shadow-lg"
            //onClick={() => window.open(previewUrls[file.id], "_blank")}
          >
            <div className="mb-4 relative">
              {
                getPreviewElement(file.url,"h-48")
              }
            </div>

            <p className="font-semibold text-gray-800 truncate">
              {file.originalName}
            </p>
            <Link
              href={
                pathname.includes("/student/resources")
                ?
                  `/student/resources/${material.title.toLowerCase().split(" ").join("-")}/${material.id}/file?fileurl=${file.url}`
                :
                  `/materials/${material.title.toLowerCase().split(" ").join("-")}/${material.id}/file?fileurl=${file.url}`
              }
              className="mt-3 text-blue-600 flex items-center gap-2 text-sm cursor-pointer">
              <Eye className="w-4 h-4" /> Open
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

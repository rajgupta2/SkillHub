"use client";
import { usePathname } from "next/navigation";
import { FileIcon, Eye, Loader2, X, Share2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { formateDate } from "@/lib/formateDate";
import Link from "next/link";
import { generateLinkSlug } from "@/lib/slugify";
import { Material, S3File } from "@/types/types";

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
  file,
  materialTitle,
  onClose,
}: {
  file:S3File;
  materialTitle:string;
  onClose: () => void;
}){
  return (
    <div className=" mx-8 mt-6 border rounded-xl shadow p-4 bg-white overflow-hidden">
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold">File Preview</h3>
        <div className="flex gap-4">
          <div className="bg-gray-200 rounded-md px-2 pt-2">
            <GetDownload
              s3Key={file.s3Key}
              fileNameToSave={`${materialTitle}_${file.originalName}`}
            />
          </div>
          <button
            onClick={onClose}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        {getPreviewElement(file.url, "h-[700px]")}
      </div>
    </div>
  );
}

export default function FilesPreview({
  material,
  onClose,
}: {
  material: Material;
  onClose: () => void;
}) {

  const title=generateLinkSlug(material.title);
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
        Uploaded by {material.uploadedBy.name} •{" "}
        {formateDate(material.createdAt)}
      </p>

      <div className="absolute top-16 right-4">
        <button
          onClick={() => {
            handleShare(
              `${window.location.origin}/resources/${title}/${material.id}`,
              material.title,
            );
          }}
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
              {getPreviewElement(file.url, "h-48")}
            </div>

            <p className="font-semibold text-gray-800 truncate">
              {file.originalName}
            </p>
            <div className="flex gap-4 text-blue-600 mt-3">
              <Link
                href={`/resources/${generateLinkSlug(material.title)}/${material.id}/file?fileurl=${encodeURIComponent(file.url)}`}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Eye className="w-4 h-4" /> Open
              </Link>
              {
                (file.s3Key) &&
                <GetDownload
                  s3Key={file.s3Key}
                  fileNameToSave={`${material.title}_${file.originalName}`}
                />
              }
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface GetDownloadProps {
  s3Key: string;
  fileNameToSave: string;
}

const GetDownload = ({ s3Key, fileNameToSave }: GetDownloadProps) => {
  const handleDownload = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/download?s3Key=${encodeURIComponent(
      s3Key,
    )}&fileName=${encodeURIComponent(fileNameToSave)}`;

    window.location.href = url;
  };

  return (
    <div
      onClick={handleDownload}
      className="flex gap-2 items-center text-sm cursor-pointer"
    >
      <Download className="w-4 h-4" />
      Download
    </div>
  );
};

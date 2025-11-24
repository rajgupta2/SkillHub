"use client";
import { useState, useEffect } from "react";
import { FileIcon, Eye, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { formateDate } from "@/components/formateDate";


interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  description: string;
  uploadedBy: {
    name: string;
    email: string;
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
const getPreviewElement = (url:string,height:string) => {
  //const url = previewUrls[file.id]; //for presigned url
  if (!url) return null;
  const ext = url.split(".").pop()!.toLowerCase();

  if (["png", "jpg", "jpeg", "webp"].includes(ext))
    return <img src={url} className={`w-full ${height} object-cover rounded-xl`} />;

  if (ext === "pdf")
    return <iframe src={url} className={`w-full ${height} rounded-xl border`} />;

  return (
    <iframe
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
      className={`w-full ${height}  rounded-xl border shadow-sm bg-white`}
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
    <div className=" mx-8 mt-6 border rounded-xl shadow p-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">File Preview</h3>
        <button
          onClick={onClose}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      { getPreviewElement(presignedUrl,"h-[600px]")}
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
{
  /*
  const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string }>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch preview URL for a file (signed URL)
    const fetchPreview = async (file: Material["files"][0]) => {
      try {
        setLoadingId(file.id);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/student/contribute/${file.id}`,
          {
            credentials: "include",
          }
        );
        const { url } = await res.json();
        setPreviewUrls((prev) => ({ ...prev, [file.id]: url }));
      } finally {
        setLoadingId(null);
      }
    };
    // Fetch preview URL for each file (signed URL)
    material.files.forEach((file) => fetchPreview(file));
  }, []);
  */
}


  //single file preview
  const [singleFileModal,setSingleFileModal]=useState(false);
  const [singleFilePreview,setSingleFilePreview]=useState<string | null>();

  if(singleFilePreview && singleFileModal)
    return <SingleFilePreview presignedUrl={singleFilePreview} onClose={()=>{ setSingleFileModal(false); setSingleFilePreview(null);}} />


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
              {/* for presigned url
                !previewUrls[file.id] || loadingId === file.id ? (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl">
                  <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
                </div>
              ) : (
                getPreviewElement(file)
              )
              */}
              {
                getPreviewElement(file.url,"h-48")
              }
            </div>

            <p className="font-semibold text-gray-800 truncate">
              {file.originalName}
            </p>
            <button
              onClick={()=>{
                    //setSingleFilePreview(previewUrls[file.id]);
                    setSingleFilePreview(file.url);
                    setSingleFileModal(true);
              }}
              className="mt-3 text-blue-600 flex items-center gap-2 text-sm cursor-pointer">
              <Eye className="w-4 h-4" /> Open
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

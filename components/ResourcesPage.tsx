"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Download, Filter, Search, Building2, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FilesPreview, {SingleFilePreview} from "@/components/FilesPreview";
import { usePathname } from "next/navigation";
import { formateDate } from "./formateDate";

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
    id:number,
    originalName:string,
    url: string,
    contentType:string
    materialId: number;
   }[];
  studentId: string;
  collegeId: number | null;
}

export function ResourcesPage({url,title,homePage=false}:{url:string,title:string,homePage?:boolean}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(url, {
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch materials");

        const data = await res.json();
        setMaterials(data.materials || []);
      } catch (err) {
        console.error("Error fetching materials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

    // ✅ Filter + Search logic
  const filteredResources = materials.filter((r) => {
    const matchesFilter = filter === "All" || r.type === filter;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.uploadedBy.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  //preview Material
  const [previewMaterial, setpreviewMaterial] = useState<Material | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleView = (material: Material) => {
    setpreviewMaterial(material);
    setModalOpen(true);
  };

  //single file preview
  const [singleFileModal,setSingleFileModal]=useState(false);
  const [singleFilePreview,setSingleFilePreview]=useState<string | null>();

  const handleSinglePreview=async (file:Material["files"][0])=>{
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/contribute/${file.id}`,{
    //     credentials: "include",
    // });
    // const { url } = await res.json();
    setSingleFilePreview(file.url);
    setSingleFileModal(true);
  }
  const filterTypes = ["All", "Notes", "Assignment", "Project","PYQ"];

  if(singleFilePreview && singleFileModal)
    return <SingleFilePreview presignedUrl={singleFilePreview} onClose={()=>{ setSingleFileModal(false); setSingleFilePreview(null);}} />

  if(previewMaterial && modalOpen)
    return  <FilesPreview material={previewMaterial}  onClose={() =>{setModalOpen(false); setpreviewMaterial(null);}} />

  return (
    <div className="flex flex-col  bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-8 px-4 md:px-10">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" /> {title}
        </h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 mt-4 md:mt-0">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, subject, or uploader..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap px-4 md:px-10">
        <div className="flex gap-3 flex-wrap justify-center">
          { filterTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setFilter(type)}
              className={`${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } px-6 py-2 rounded-full transition`}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Scrollable Materials Section */}
      <main className={`px-8 md:px-16 py-10 overflow-y-auto ${homePage ? "" : "max-h-[60vh]"} scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100`}>
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading materials...</div>
        ) : filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No materials found. Try searching something else.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${homePage ? "lg:grid-cols-4 gap-6" : "lg:grid-cols-3 gap-8"} `}>
            {
              filteredResources.map((resource) => (
                <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          resource.type === "Notes"
                            ? "bg-green-100 text-green-700"
                            : resource.type === "Assignment"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {resource.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 text-gray-800">
                      {resource.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{resource.subject}</p>
                    <p className="text-gray-600 text-sm mt-3">
                      Uploaded by <span className="font-medium">{resource.uploadedBy.name}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      📅 {formateDate(resource.createdAt)}
                    </p>
                    <div className="flex justify-end mt-5">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
                          onClick={
                            ()=>{
                              if(resource.files.length===1)
                                return handleSinglePreview(resource.files[0]);
                              handleView(resource);
                            }
                          }>
                          <Eye className="w-4 h-4" /> View
                        </Button>
                    </div>
                  </motion.div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}

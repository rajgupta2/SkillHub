"use client";

import React, { useRef, useState, useEffect } from "react";
import { FilePlus, BookOpen, Upload as UploadIcon, Trash, CheckCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { formateDate } from "@/components/formateDate";
import ArticlesList from "@/components/article/ArticleListRender";
import { ArticleSchema } from "@/components/article/schema";
import { getPlainText } from "@/components/article/ArticleListRender";
import { User,Calendar } from "lucide-react";
//used for preview files in recent contribution section
interface Contribution {
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
    id:number;
    originalName:string;
    url: string;
    contentType:string;
    materialId: number;
   }[];
  studentId: string | null;
  collegeId: number | null;
}

//used for preview files in form
type UploadFile = {
  file: File;
  id: string;
  progress: number; // 0 - 100
  error?: string | null;
  previewUrl?: string | null; // for images
  uploaded?: boolean;
};


export default function UploadPage({
  articles,
  isStudentZone
}:{
  articles: ArticleSchema[];
  isStudentZone: boolean;
}) {
  // Form state
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("Notes");
  const [description, setDescription] = useState("");

  // Upload state
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // UI feedback
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const fetchContributions = async () => {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-contribution?limit=100`, {
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContributions(data.materials);
      } catch (error) {
        console.error(error);
      }
  };


  useEffect(() => {
    fetchContributions();
  }, []);


  // Remove contribution from list (client only)
  const handleRemoveContribution = (id: number) => {
    setContributions((prev) => prev.filter((c) => c.id !== id));
  };

  //Preview Contribution File
  const [previewContribution, setpreviewContribution] = useState<Contribution| null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleView = (contribution: Contribution) => {
    setpreviewContribution(contribution);
    setModalOpen(true);
  };

  if(previewContribution && modalOpen)
    return  ( <FilePreview material={previewContribution} onClose={() => setModalOpen(false)} /> )

  return (
   <>
    <div className="p-6 bg-gray-50 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Header */}
        <div className=" bg-white rounded-xl shadow p-6 border border-gray-100 max-h-[70vh] overflow-y-auto">
          <h1 className=" text-lg font-semibold text-gray-800">
             My Community Post
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                {articles.map((a, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-lg bg-white border border-blue-100 hover:shadow-xl transition group"
                    >
                      {/* Content */}
                      <div className="p-6">
                        {/* Type badge */}
                        <span className="inline-block mb-3 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          {a.type}
                        </span>

                        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                          {a.title}
                        </h2>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                         {getPlainText(a.contentHtml, 160)}
                        </p>

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-4">
                          {a.tags.split(",").map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <User className="w-4 h-4 mr-1" />
                          {a.author.name}
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          {formateDate(a.createdAt)}
                        </div>

                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Link href={
                              a.isPublished ?
                               `/community/${a.slug}`
                              :
                               `/community/create?slug=${a.slug}&type=${a.type}`
                          }>
                            View
                          </Link>
                        </Button>
                      </div>
                                </motion.div>
        ))}
        </div>
        </div>

        <div>
         {/* Recent Contributions */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100 max-h-[70vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> My Resources
            </h3>
            <span className="text-sm text-gray-500">{contributions.length} items</span>
          </div>

          <ul className="space-y-3">
            {
              contributions.map((c) => {
                return (
                  <li
                  key={c.id}
                  className="flex items-start justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                      <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-white/50">
                        {c.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {c.subject} • {c.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      By {c.uploadedBy?.name} • {formateDate(c.createdAt)}
                    </p>

                    {c.description && (
                      <p className="text-sm text-gray-600 mt-2">{c.description}</p>
                    )}
                  </div>

                  <div className="flex items-end gap-2">
                      <Button
                        onClick={()=>{handleView(c)}}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm items-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" /> View
                      </Button>
                    <Button
                      onClick={() => handleRemoveContribution(c.id)}
                      title="Remove (client-side)"
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm items-center gap-2 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
                )
            })}
          </ul>
        </motion.aside>
      </div>
    </div>
    </div>
  </>
  );
}
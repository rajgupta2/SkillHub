"use client";

import React, { useRef, useState, useEffect } from "react";
import { FilePlus, BookOpen, Upload as UploadIcon, Trash, CheckCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import FilePreview from "@/components/FilesPreview";
import { log } from "console";
import { formateDate } from "@/components/formateDate";

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

const MAX_FILES = 5;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
  "image/png",
  "image/jpeg",
];

export default function ContributePage() {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-contribution?limit=5`, {
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


    // Helpers
  const resetForm = () => {
    setTitle("");
    setSubject("");
    setType("Notes");
    setDescription("");
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
    setSuccessMsg(null);
  };

  // Validate and add files (multiple) setting files state
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    // merge with existing file count
    if (files.length + selected.length > MAX_FILES) {
      setError(`You can upload up to ${MAX_FILES} files per contribution.`);
      return;
    }

    const newUploadFiles: UploadFile[] = [];

    for (const f of selected) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setError(`Unsupported file type: ${f.name}`);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        setError(`File too large: ${f.name} (max ${MAX_FILE_SIZE / (1024 * 1024)} MB)`);
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const isImage = f.type.startsWith("image/");
      const previewUrl = isImage ? URL.createObjectURL(f) : null;

      newUploadFiles.push({
        file: f,
        id,
        progress: 0,
        error: null,
        previewUrl,
        uploaded: false,
      });
    }

    if (newUploadFiles.length > 0) {
      setFiles((prev) => [...prev, ...newUploadFiles]);
    }
  };

  const removePendingFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

    //simulation + animation + we can also do here one by one upload but because of our specific schema we are going only with animation
  const uploadAllFiles = async () => {
    if (files.length === 0) {
      setError("Please attach at least one file.");
      return null;
    }

    setIsUploading(true);
    setError(null);

    // Create a copy so we can update state per-file
    const updatedFiles = [...files];

    // For each file simulate progress then mark uploaded
    for (let i = 0; i < updatedFiles.length; i++) {
      const f = updatedFiles[i];

      // Simulate network upload with interval
      await new Promise<void>((resolve) => {
        let p = 0;
        const interval = setInterval(() => {
          p += Math.random() * 15; // increment randomly
          if (p >= 100) p = 100;

          // update state
          setFiles((prev) => prev.map((item) => (item.id === f.id ? { ...item, progress: Math.round(p) } : item)));

          if (p >= 100) {
            clearInterval(interval);
            // mark as uploaded
            setFiles((prev) => prev.map((item) => (item.id === f.id ? { ...item, uploaded: true } : item)));
            resolve();
          }
        }, 250);
      });
    }
    // Return filenames as the "uploaded" result (in real flow, return file URLs)
    return updatedFiles.map((u) => u.file.name);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }
    if (files.length === 0) {
      setError("Please attach at least one file.");
      return;
    }

    // upload files (simulated here)
    const uploadedNames = await uploadAllFiles();
    if (!uploadedNames) {
      setError("Upload failed.");
      return;
    }

    //This is backend call with real setup
    const selectedFiles = Array.from(fileInputRef.current?.files || []);
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("type", type);
    // append all files
    selectedFiles.forEach((file) => {
      if (file) {
        formData.append("files", file);
      }
    });

    try {
      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material`, {
        method: "POST",
        credentials:"include",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
        setError(data.message || "Something went wrong");
      }
      setSuccessMsg("Materials uploaded successfully!");
      await fetchContributions();
      //Removing preview image in form
      files.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setSuccessMsg(null), 4000);
      resetForm();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }finally{
     setIsUploading(false);
    }
  };

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
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FilePlus className="w-7 h-7 text-blue-600" /> Contribute
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
          Share notes, assignments or past-year papers to help your college peers. You can upload multiple files at once.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          <div className="grid gap-4 overflow-y-auto">
            <label className="text-sm text-gray-600">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Operating Systems - PYQ 2023"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Subject <span className="text-red-400">*</span></label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="E.g. Operating Systems"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Notes</option>
                  <option>Assignment</option>
                  <option>PYQ</option>
                  <option>Project</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Files (max {MAX_FILES}, each ≤ {MAX_FILE_SIZE / (1024 * 1024)} MB)</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                  onChange={handleFilesSelect}
                />
                <div className="text-sm text-gray-500">or drag & drop (coming soon)</div>
              </div>

              {/* Selected files preview */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f) => (
                    <div key={f.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-3">
                        {f.previewUrl ? (
                          <img src={f.previewUrl} alt="preview" className="w-10 h-10 object-cover rounded" />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded text-sm text-gray-700">DOC</div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-800">{f.file.name}</div>
                          <div className="text-xs text-gray-500">{Math.round(f.file.size / 1024)} KB</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Progress bar */}
                        <div className="w-40">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-blue-600 rounded-full transition-all"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removePendingFile(f.id)}
                          className="text-red-500 hover:text-red-700"
                          disabled={isUploading}
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Short description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe what this material covers (optional)"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {successMsg && (
              <div className="text-sm text-green-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" /> {successMsg}
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2" disabled={isUploading}>
                <FilePlus className="w-4 h-4" /> {isUploading ? "Uploading..." : "Contribute"}
              </Button>

              <Button type="button" className="bg-gray-100 text-gray-800 hover:bg-gray-200" onClick={resetForm} disabled={isUploading}>
                Reset
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Recent Contributions */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-white rounded-xl shadow p-6 border border-gray-100 max-h-[70vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Recent Contributions
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

                  <div className="flex flex-col items-end gap-2">
                      <Button
                        onClick={()=>{handleView(c)}}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" /> View
                      </Button>
                    {
                    /*
                    <button
                      onClick={() => handleRemoveContribution(c.id)}
                      title="Remove (client-side)"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                    */
                   }
                  </div>
                </li>
                )
            })}
          </ul>

        </motion.aside>
      </div>
    </div>
  </>
  );
}

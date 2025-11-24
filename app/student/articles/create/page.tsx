"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Tags, ImageIcon } from "lucide-react";
import { marked } from "marked";

// Dynamically load the Markdown editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });


export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [contentMd, setContentMd] = useState<string>("");
  const [tags, setTags] = useState<string>(""); // comma separated
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      setThumbnail(null);
      return;
    }

    // Allowed types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
      setThumbnail(null);
      return;
    }

    // Max size = 2 MB
    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size must be less than 2 MB.");
      setThumbnail(null);
      return;
    }

    // Valid file
    setThumbnail(file);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contentMd?.trim()) {
      alert("Please fill all required fields!");
      return;
    }
    // Convert markdown → HTML
    const content = await marked(contentMd);

    // FormData for file upload
    const form = new FormData();
    form.append("title", title);
    form.append("content",content);
    form.append("contentMd", contentMd);
    form.append("tags", tags);
    if (thumbnail) form.append("thumbnail", thumbnail);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/articles`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Article published successfully!");
      setTitle("");
      setContentMd("");
      setTags("");
      setThumbnail(null);
    } else {
      alert("Failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-700 mb-10"
      >
        ✍️ Share Your Article With Community
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg  mx-auto space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Article Title
          </label>
          <Input
            type="text"
            placeholder="Amazing topic starts here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Upload Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="block border p-2 rounded-lg cursor-pointer"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* TAGS */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <Tags className="w-4 h-4" /> Tags (comma separated)
          </label>
          <Input
            type="text"
            placeholder="technology, motivation, coding"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* MARKDOWN EDITOR */}
        <div data-color-mode="light">
          <label className="block text-gray-700 font-semibold mb-2">
            Article Content (Markdown)
          </label>
          <div className="border border-blue-100 rounded-lg shadow-sm">
            <MDEditor value={contentMd} onChange={(value)=>setContentMd(value || "")} height={400} />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" /> Publish Article
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setTitle("");
              setContentMd("");
              setTags("");
              setThumbnail(null);
            }}
            className="border-blue-600 text-blue-600 flex items-center gap-2"
          >
            <FileText className="w-5 h-5" /> Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

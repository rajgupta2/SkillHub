"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Tags} from "lucide-react";
import { PartialBlock } from "@blocknote/core";
import { Save } from "lucide-react";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";


const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});
import { convertBlockNoteToHTML } from "./blocknoteToHtml";

export default function CreateContent() {
  const [form, setForm] = useState({
    title: "",
    contentJson: [{ type: "heading", props:{level:3}, content: ["Start Typing..."]}] as PartialBlock[],
    type: "",
    tags: "",
  });

  async function handleSubmit(publish: boolean) {
    let message;
    try{
      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;

      const html=await convertBlockNoteToHTML(form.contentJson);
      const cleanHtml = DOMPurify.sanitize(html);
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          contentHtml:cleanHtml,
          isPublished: publish,
        }),
      });

      if(res.status===201){
        const result=await res.json();
        message=result.message;
      }
    }catch(err){
      console.log("Error Occured: ",err);
      message="Failed to save."
    }finally{
      alert(message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-8 md:px-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-blue-700"
      >
          Create Content
      </motion.h1>

      <p className="text-slate-500 mt-1">
          Share your knowledge with the Skillhub community
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-4 ">
        {/* TITLE */}
        <div className="md:w-120">
          <label className="block text-gray-700 font-semibold">
            Content Title
          </label>
          <Input
            type="text"
            placeholder="Enter a title..."
            value={form.title}
            onChange={(e) => setForm({...form,title:e.target.value})}
            required
          />
        </div>

        {/* TAGS */}
        <div className="md:w-120">
          <label className="block text-gray-700 font-semibold">
            Tags (comma separated)
          </label>
          <Input
            type="text"
            placeholder="technology, motivation, coding"
            value={form.tags}
            onChange={(e) => setForm({...form,tags:e.target.value})}
          />
        </div>
      </div>

        <div className="mt-4 md:w-120">
          <label className="block text-gray-700 font-semibold">
            Content Type
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-120 rounded-lg border px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select content type</option>
            <option value="BLOG">Blog</option>
            <option value="TUTORIAL">Tutorial</option>
            <option value="EXAM">Exam</option>
            <option value="GUIDE">Guide</option>
          </select>
        </div>

        <Editor
          initialContent={form.contentJson}
          setContent={(content) =>
            setForm({ ...form, contentJson: content })
          }
        />

        {/* BUTTONS */}
        <div className="flex gap-6 mt-10">
          <Button
            onClick={() => handleSubmit(false)}
            variant="outline"
            className="
              flex items-center gap-2
              bg-slate-200
              text-slate-700
              border-slate-200
              hover:bg-slate-400
            "
          >
             <Save className="w-5 h-5"/> Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" /> Publish Article
          </Button>
        </div>
    </div>
  );
}





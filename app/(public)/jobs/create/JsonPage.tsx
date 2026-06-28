"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
} from "lucide-react";
import { JobSchema } from "./FormPage";
import { convertBlockNoteToHTML } from "@/components/article/blocknoteToHtml";
import DOMPurify from "dompurify";
import { Job } from "@/components/jobs/jobsSchema";

function prettyJson(value: any) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function JsonPage({
    setMsg
}:{
    setMsg:(msg:string | null)=>void;
}){

  // --- BULK JSON
  const [bulkJson, setBulkJson] = useState(
    prettyJson([
      {
        title: "MERN Stack Developer",
        slug: "mern-stack-developer",
        companyName: "Example Company",
        location: "Noida, India",
        isRemote: true,
        jobType: "FULL_TIME",
        experienceLevel: "JUNIOR",
        salaryRange: "₹6–10 LPA",
        applyUrl: "https://example.com/apply",
        source: "Company Careers Page",
        expiryDate: "2026-02-13",
        isPublished: true,
        isActive: true,
        descriptionJson: [{ type: "heading", props:{level:4}, content: ["Description about the job..."]}],
      },
    ])
  );
  const [loading,setLoading]=useState(false);

  async function submitBulk() {
    setLoading(true);
    setMsg(null);

    try {
      let arr: any = null;
      try {
        arr = JSON.parse(bulkJson);
      } catch {
        throw new Error("Bulk JSON is not valid JSON");
      }

      if (!Array.isArray(arr)) throw new Error("Bulk JSON must be an array");
      if (arr.length === 0) throw new Error("Bulk JSON array is empty");

      const newArr = await Promise.all(
        arr.map(async (job) => {
          const html = await convertBlockNoteToHTML(job.descriptionJson);
          const cleanHtml = DOMPurify.sanitize(html);
          return {
            ...job,
            descriptionHtml: cleanHtml,
            expiryDate: job.expiryDate ? new Date(job.expiryDate) : null,
          };
        })
      );
      // Validate each item
      for (const job of newArr) JobSchema.parse(job);

      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newArr)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create jobs");

      setMsg(`✅ ${data?.createdCount ?? arr.length} jobs created successfully`);
    } catch (e: any) {
      setMsg(`❌ ${e?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
        <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold">Bulk JSON Input</p>
            <p className="mt-1 text-xs text-muted-foreground">
            Paste an array of jobs. This is the fastest way to upload job updates.
            Each item must contain <span className="font-medium">descriptionJson</span>.
            </p>
        </div>

        <Textarea
            value={bulkJson}
            onChange={(e) => setBulkJson(e.target.value)}
            className="min-h-[70vh] rounded-2xl font-mono text-xs"
        />

        <div className="flex flex-wrap items-center gap-3">
            <Button
                disabled={loading}
                onClick={submitBulk}
                className="h-11 rounded-2xl"
            >
               <Upload className="mr-2 h-4 w-4" />
                {loading ? "Uploading..." : "Create Jobs (Bulk)"}
            </Button>

            <Button
                variant="outline"
                disabled={loading}
                onClick={() => setBulkJson("[]")}
                className="h-11 rounded-2xl"
            >
                Clear
            </Button>
        </div>
    </>
  );
}
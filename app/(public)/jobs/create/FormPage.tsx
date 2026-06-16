"use client";

import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PartialBlock } from "@blocknote/core";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/article/Editor"), {
  ssr: false,
});
import { convertBlockNoteToHTML } from "@/components/article/blocknoteToHtml";
import DOMPurify from "dompurify";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import {
  Briefcase,
  Building2,
  MapPin,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Wand2,
  Upload,
  RotateCcw,
} from "lucide-react";

const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACT",
  "FREELANCE",
] as const;

const EXPERIENCE_LEVELS = ["FRESHER", "JUNIOR", "MID", "SENIOR"] as const;

export const JobSchema = z.object({
  title: z.string().min(3, "Title is too short"),

  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(JOB_TYPES),
  experienceLevel: z.enum(EXPERIENCE_LEVELS),

  salaryRange: z.string().optional().nullable(),
  applyUrl: z.url("Apply URL must be a valid URL"),
  isActive: z.boolean().optional(),
  isRemote: z.boolean().optional(),

  // IMPORTANT: UI will send string. Backend will convert to Date.
  expiryDate: z.date().nullable(),

  // BlockNote
  descriptionJson: z.any(),
  descriptionHtml:z.string()
});

type JobInput = z.infer<typeof JobSchema>;

export default function FormPage({setMsg}:{
setMsg:(msg:string | null)=>void;
}){

  // --- FORM STATE
  const [title, setTitle] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  const [isRemote, setIsRemote] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [jobType, setJobType] = useState<JobInput["jobType"]>("FULL_TIME");
  const [experienceLevel, setExperienceLevel] = useState<JobInput["experienceLevel"]>(
    "JUNIOR"
  );

  // yyyy-mm-dd
  const [expiryDate, setExpiryDate] = useState<any>();

  // BlockNote JSON (temporary textarea)
  const [descriptionJson, setdescriptionJson] = useState<PartialBlock[]>([{ type: "heading", props:{level:4}, content: ["Description about the job..."]}]);

  const [loading,setLoading]=useState<boolean>(false);
  function resetForm() {
    setTitle("");
    setCompanyName("");
    setLocation("");
    setApplyUrl("");
    setSalaryRange("");
    setIsRemote(false);
    setIsActive(true);
    setJobType("FULL_TIME");
    setExperienceLevel("JUNIOR");
    setExpiryDate("");
    setdescriptionJson([{ type: "heading", props:{level:4}, content: ["Description about the job..."]}]);
  }

  async function submitForm() {
    setLoading(true);
    setMsg(null);
    const html=await convertBlockNoteToHTML(descriptionJson);
    const cleanHtml = DOMPurify.sanitize(html);
    try {

      //validating
      const payload: JobInput [] = [{
        title: title.trim(),
        companyName: companyName.trim(),
        location: location.trim(),
        isRemote,
        jobType,
        experienceLevel,
        salaryRange: salaryRange.trim() ? salaryRange.trim() : null,
        applyUrl: applyUrl.trim(),
        expiryDate: expiryDate || null,
        isActive,
        descriptionJson,
        descriptionHtml:cleanHtml
      }];
      JobSchema.parse(payload);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create job");

      setMsg("✅ Job created successfully");
      resetForm();
    } catch (e: any) {
      setMsg(`❌ ${e?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                placeholder="Node.js Developer"
                className="rounded-2xl"
            />
            </div>

            <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Google"
                className="rounded-2xl"
            />
            </div>

            <div className="space-y-2">
                <Label>Location</Label>
                <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Noida, India"
                    className="rounded-2xl"
                />
            </div>

            {/* Expiry date */}
            <div className="space-y-2">
                <Label className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Last Date to Apply (optional)
                </Label>
                <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="rounded-2xl"
                />
                <p className="text-xs text-muted-foreground">
                    If set, you can hide expired jobs automatically in public page.
                </p>
            </div>

            <div className="space-y-2">
                <Label>Job Type</Label>
                <select
                    className="h-11 w-full rounded-2xl border bg-background px-3 py-2 text-sm"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="FREELANCE">Freelance</option>
                </select>
            </div>

            <div className="space-y-2">
                <Label>Experience Level</Label>
                <select
                    className="h-11 w-full rounded-2xl border bg-background px-3 py-2 text-sm"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                >
                    <option value="FRESHER">Fresher</option>
                    <option value="JUNIOR">Junior</option>
                    <option value="MID">Mid</option>
                    <option value="SENIOR">Senior</option>
                </select>
            </div>

            <div className="space-y-2">
                <Label>Salary Range (optional)</Label>
                <Input
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="₹6–10 LPA"
                    className="rounded-2xl"
                />
            </div>

            <div className="space-y-2">
                <Label>Apply URL</Label>
                <Input
                    value={applyUrl}
                    onChange={(e) => setApplyUrl(e.target.value)}
                    placeholder="https://company.com/careers/job"
                    className="rounded-2xl"
                />
            </div>
        </div>

        {/* Switches */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-2xl border bg-white/40 p-4 dark:bg-slate-950/30">
                <div className="min-w-0">
                    <p className="text-sm font-medium">Remote</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Mark job as remote
                    </p>
                </div>
                <Switch checked={isRemote} onCheckedChange={setIsRemote} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-white/40 p-4 dark:bg-slate-950/30">
                <div className="min-w-0">
                    <p className="text-sm font-medium">Active</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                    Job is currently open
                    </p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
        </div>

        {/* descriptionJson */}
        <div className="space-y-2">
            <Label className="inline-flex items-center gap-2">
            <Wand2 className="h-4 w-4" /> BlockNote JSON (source of truth)
            </Label>
            <Editor
                initialContent={descriptionJson}
                setContent={(content) =>setdescriptionJson(content )
                }
            />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            disabled={loading}
            onClick={submitForm}
            className="h-11 rounded-2xl cursor-pointer"
            >
             {loading ? "Saving..." : "Create Job"}
            </Button>

            <Button
                variant="outline"
                disabled={loading}
                onClick={resetForm}
                className="h-11 rounded-2xl cursor-pointer"
            >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
        </div>
    </>
  );
}
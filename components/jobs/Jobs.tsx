"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Search,
  ExternalLink,
  Building2,
  Clock,
  Filter,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

import { Pill, Logo, cn, Stat } from "@/components/jobs/jobsJSX";
import { Job, JOB_TYPE_LABEL,EXP_LABEL, JobType, ExperienceLevel } from "@/components/jobs/jobsSchema";

function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Link href={`/jobs/${job.slug}`} className="block h-full">
        <Card
          className={cn(
            "group relative h-full overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur",
            "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
            "dark:bg-slate-900/40"
          )}
        >
          {/* soft hover glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-200/70 via-sky-200/60 to-emerald-200/60 blur-3xl dark:from-indigo-900/30 dark:via-sky-900/25 dark:to-emerald-900/25" />
          </div>

          <CardContent className="relative flex h-full flex-col p-5">
            {/* Top */}
            <div className="flex items-start gap-4">
              <Logo name={job.companyName} src={job.companyLogo} />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight">
                      {job.title}
                    </h3>

                    <div className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="h-4 w-4" /> {job.companyName}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.isRemote ? `${job.location} (Remote)` : job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Pill>
                    <Briefcase className="mr-1 h-3.5 w-3.5" />
                    {JOB_TYPE_LABEL[job.jobType]}
                  </Pill>
                  <Pill>
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    {EXP_LABEL[job.experienceLevel]}
                  </Pill>
                  {job.salaryRange ? <Pill>{job.salaryRange}</Pill> : null}
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom */}
            <div className="mt-5 flex flex-col gap-3">
              <Button
                className={cn(
                  "h-11 w-full rounded-2xl",
                  "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer",
                  "shadow-sm"
                )}
              >
                  View & Apply <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function JobsPage({jobs}:{jobs:Job[]}) {
  const [query, setQuery] = useState("");
  const [jobType, setJobType] = useState<JobType | "ALL">("ALL");
  const [exp, setExp] = useState<ExperienceLevel | "ALL">("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return jobs
      .filter((j) => j.isActive)
      .filter((j) => {
        if (!q) return true;
        return (
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
        );
      })
      .filter((j) => (jobType === "ALL" ? true : j.jobType === jobType))
      .filter((j) => (exp === "ALL" ? true : j.experienceLevel === exp))
      .filter((j) => (remoteOnly ? j.isRemote : true))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [jobs, query, jobType, exp, remoteOnly]);

  const totalActive = useMemo(() => jobs.filter((j) => j.isActive).length, [jobs]);
  const totalRemote = useMemo(
    () => jobs.filter((j) => j.isActive && j.isRemote).length,
    [jobs]
  );
  const totalInternships = useMemo(
    () => jobs.filter((j) => j.isActive && j.jobType === "INTERNSHIP").length,
    [jobs]
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 dark:opacity-15 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Top Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/40">
                <Briefcase className="h-4 w-4" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Jobs
              </h1>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Find fresh openings for MERN, Node.js, AWS, internships, and more.
              Apply directly on the company’s official page.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Stat label="Active" value={`${totalActive}`} />
            <Stat label="Remote" value={`${totalRemote}`} />
            <Stat label="Internships" value={`${totalInternships}`} />
          </div>
        </div>

        {/* Filters */}
        <Card className="mt-6 rounded-2xl border bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="h-4 w-4" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search role, company, location"
                  className="h-11 rounded-2xl bg-white/70 pl-10 backdrop-blur dark:bg-slate-950/40"
                />
              </div>

              <Select value={jobType} onValueChange={(v) => setJobType(v as any)}>
                <SelectTrigger className="h-11 rounded-2xl bg-white/70 backdrop-blur dark:bg-slate-950/40">
                  <SelectValue placeholder="Job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All types</SelectItem>
                  <SelectItem value="FULL_TIME">Full-time</SelectItem>
                  <SelectItem value="PART_TIME">Part-time</SelectItem>
                  <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="FREELANCE">Freelance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={exp} onValueChange={(v) => setExp(v as any)}>
                <SelectTrigger className="h-11 rounded-2xl bg-white/70 backdrop-blur dark:bg-slate-950/40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All levels</SelectItem>
                  <SelectItem value="FRESHER">Fresher</SelectItem>
                  <SelectItem value="JUNIOR">Junior</SelectItem>
                  <SelectItem value="MID">Mid</SelectItem>
                  <SelectItem value="SENIOR">Senior</SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant={remoteOnly ? "default" : "outline"}
                className="h-11 rounded-2xl"
                onClick={() => setRemoteOnly((s) => !s)}
              >
                {remoteOnly ? "Remote only ✓" : "Remote only"}
              </Button>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{filtered.length}</span> jobs
              </p>

              <Button
                variant="ghost"
                className="rounded-2xl"
                onClick={() => {
                  setQuery("");
                  setJobType("ALL");
                  setExp("ALL");
                  setRemoteOnly(false);
                }}
              >
                Reset filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Grid List */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <Card className="col-span-full rounded-2xl border bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/40">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-base font-semibold">No jobs found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try removing filters or searching a different keyword.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </main>
  );
}

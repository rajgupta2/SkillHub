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
      <Link href={`/jobs/${job.slug}`}>
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

          <CardContent className="relative flex h-full flex-col px-5 py-1">
            {/* Top */}
            <div className="flex items-start gap-4">
              <Logo name={job.companyName}/>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle >
                      {job.title}
                    </CardTitle>

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
            <div className="ml-auto mt-5">
              <Button
                className=" bg-blue-700  hover:bg-blue-800 cursor-pointer"
              >
                  View & Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function JobsPage({jobs}:{jobs:Job[]}) {
  if(!jobs || (Array.isArray(jobs)&& jobs.length===0))
  {
    return (
      <div className="flex justify-center text-center pt-[30vh]">
        <p className="text-center">No Job Found.</p>
      </div>
    )
  }
  return (
    <div className="px-8 my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      }
    </div>
  );
}

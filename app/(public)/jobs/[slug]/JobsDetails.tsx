"use client";
import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import {
  Briefcase,
  MapPin,
  ExternalLink,
  Building2,
  Clock,
  ArrowLeft,
  Sparkles,
  Globe,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Job, JOB_TYPE_LABEL,EXP_LABEL } from "@/components/jobs/jobsSchema";
import { Pill, Logo, cn, Stat } from "@/components/jobs/jobsJSX";

function timeAgo(dateIso: string) {
  const d = new Date(dateIso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

import { formateDate } from "@/components/formateDate";

export default function JobDetailsPage({job}:{job:Job}) {

  if (!job) return notFound();

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <Logo name={job.companyName}/>

                <div className="min-w-0">
                  <CardTitle className="text-xl tracking-tight sm:text-2xl">
                    {job.title}
                  </CardTitle>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> {job.companyName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.isRemote ? `${job.location} (Remote)` : job.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill>
                      <Briefcase className="mr-1 h-3.5 w-3.5" />
                      {JOB_TYPE_LABEL[job.jobType]}
                    </Pill>
                    <Pill>
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      {EXP_LABEL[job.experienceLevel]}
                    </Pill>
                    {job.salaryRange ? <Pill>{job.salaryRange}</Pill> : null}
                    <Pill>
                      <Globe className="mr-1 h-3.5 w-3.5" />
                      {job.isRemote ? "Remote" : "On-site"}
                    </Pill>
                  </div>
                </div>
              </div>

            {/*
               <div className="flex flex-col gap-2 sm:items-end">
                <Button asChild className="w-full rounded-2xl sm:w-auto">
                  <a href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply on Official Site <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground">
                  We only share job notifications. Always verify on official site.
                </p>
              </div>
            */}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Description */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent>
              <CardTitle className="text-base pb-2">Job Details</CardTitle>
              <div
                className={cn(
                  "prose max-w-none",
                  "prose-headings:scroll-mt-20",
                  "prose-a:text-primary",
                  "prose-li:my-1"
                )}
                dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p>
                  <b>Last date to apply</b>: {formateDate(job.updatedAt)}
                </p>

                <Button asChild variant="outline" className="rounded-2xl bg-blue-700 px-2 text-white">
                  <Link href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="space-y-3 text-sm">
                <CardTitle className="text-base pb-2">Quick Info</CardTitle>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium">{job.companyName}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Job Type</span>
                  <span className="font-medium">{JOB_TYPE_LABEL[job.jobType]}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{EXP_LABEL[job.experienceLevel]}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Remote</span>
                  <span className="font-medium">{job.isRemote ? "Yes" : "No"}</span>
                </div>
                {job.salaryRange && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Salary</span>
                    <span className="font-medium">{job.salaryRange}</span>
                  </div>
                )}

                <Separator />

                <Button asChild className="w-full rounded-2xl bg-blue-700">
                  <a href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <CardTitle className="text-base pb-2 text-black">Disclaimer</CardTitle>
                We share job notifications collected from official company websites and trusted sources.
                <br />
                Please always verify details on the company&apos;s official career page before applying.
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

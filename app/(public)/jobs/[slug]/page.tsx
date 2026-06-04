import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${slug}`);
  const data = await res.json();
  const job = data.job;

  if (!job) {
    return {
      title: "Job Not Found | SkillHub",
      robots: { index: false, follow: false },
    };
  }

  const title = `${job.title} at ${job.companyName} | SkillHub Jobs`;
  const description = `Apply for ${job.title} at ${job.companyName}. Location: ${job.location}. View eligibility, job type, and apply link.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs/${slug}`,
      siteName: "SkillHub",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import JobDetailsPage from "./JobsDetails";
export default async function Page({params}:{params:{slug:string}}) {
  const {slug}=await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${slug}`);
  const data = await res.json();
  return  <JobDetailsPage job={data.job}/>
}
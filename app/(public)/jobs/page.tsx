import JobsPage from "@/components/jobs/Jobs"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Job Updates | SkillHub",
  description:
    "Explore the latest job openings, internships, and remote roles. Find MERN, Node.js, AWS and fresher jobs with direct apply links.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs`,
  },
  openGraph: {
    title: "Latest Job Updates | SkillHub",
    description:
      "Find fresh job openings and internships. Apply directly from official company pages.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs`,
    siteName: "SkillHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
  const data = await res.json();
  return <JobsPage jobs={data.jobs}/>
}
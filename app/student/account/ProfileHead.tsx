"use client";

import React from "react";
import Head from "next/head";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  xpPoints: number;
  college_id: string | null;
  college: string | null;
  college_city: string | null;
  college_district: string | null;
  college_state: string | null;
  course_id: string | null;
  course: string | null;
  startYear: number | null;
  endYear: number | null;
  materials_count: number;
  rank: number;
}

interface ProfileHeadProps {
  profile: UserProfile;
}

export default function ProfileHead({ profile }: ProfileHeadProps) {
  const name = profile.name ?? "Student";
  const college = profile.college;
  const course = profile.course;

  // ----- Static Metadata based on profile -----
  const title = college
    ? `${name} – ${college} Student Profile | SkillHub`
    : `${name} – Student Profile | SkillHub`;

  const description = college
    ? `${name} studies at ${college}, ${profile.college_city}. View their profile, course details, and contributions on SkillHub.`
    : `${name}'s learning profile on SkillHub. View contributions, uploaded materials, and more.`;

  const keywords = [
    name,
    "student profile",
    "SkillHub",
    college ? `${college} student` : "",
    course ? `${course} course` : "",
    "student learning platform",
    "study materials contributor",
  ].filter(Boolean);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="SkillHub" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`} />
    </Head>
  );
}

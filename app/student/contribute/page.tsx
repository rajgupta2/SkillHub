// app/student/contribute/page.tsx (server component)
import { Metadata } from "next";
import ContributePage from "./Contribution";

export const metadata: Metadata = {
  title: "Contribute Study Materials | SkillHub",
  description:
    "Upload your study materials, assignments, projects, and reports on SkillHub. Track your contributions and help fellow students access verified learning resources.",
  keywords: [
    "SkillHub contribute",
    "upload study materials",
    "student contributions",
    "assignments",
    "projects",
    "reports",
    "college resources",
    "learning platform",
  ],
  openGraph: {
    title: "Contribute Study Materials | SkillHub",
    description:
      "Upload your study materials, assignments, projects, and reports on SkillHub. Track your contributions and help fellow students access verified learning resources.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/contribute`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Contribute Page",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute Study Materials | SkillHub",
    description:
      "Upload your study materials, assignments, projects, and reports on SkillHub. Track your contributions and help fellow students access verified learning resources.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export default function Page() {
  return <ContributePage/>;
}

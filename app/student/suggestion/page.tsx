// app/student/suggestion/page.tsx
import { Metadata } from "next";
import SuggestionsPage from "./Suggestion";

export const metadata: Metadata = {
  title: "SkillHub – Share Your Ideas & Feature Suggestions",
  description:
    "Have an idea or feature suggestion for SkillHub? Share your feedback to help us improve the student learning platform and enhance collaboration.",
  keywords: [
    "SkillHub",
    "feature suggestion",
    "student feedback",
    "student platform",
    "ideas",
    "improvements",
    "collaboration",
  ],
  openGraph: {
    title: "SkillHub – Share Your Ideas & Feedback",
    description:
      "Contribute your ideas and feature suggestions to improve SkillHub, the student platform for learning, collaboration, and resource sharing.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/suggestion`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Suggestions",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub – Share Your Ideas & Feedback",
    description:
      "Help improve SkillHub by sharing your ideas, suggestions, or feedback on new features and improvements for the student platform.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export default function Page(){
  return <SuggestionsPage/>
}
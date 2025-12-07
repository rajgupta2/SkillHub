// app/terms/page.tsx
import { Metadata } from "next";
import TermsPage from "./Terms";

export const metadata: Metadata = {
  title: "SkillHub – Terms of Service & Privacy Policy",
  description:
    "Read SkillHub's Terms of Service and Privacy Policy to understand how we protect your data and operate our platform for students and colleges.",
  keywords: [
    "SkillHub",
    "Terms of Service",
    "Privacy Policy",
    "student platform",
    "data protection",
    "college learning"
  ],
  openGraph: {
    title: "SkillHub – Terms & Privacy",
    description:
      "SkillHub ensures your privacy and provides guidelines for using the platform. Learn more about our Terms of Service and Privacy Policy.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Terms & Privacy",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub – Terms & Privacy",
    description:
      "SkillHub provides clear Terms of Service and Privacy Policy for students and colleges using the platform.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};


export default function Page(){
  return <TermsPage/>
}
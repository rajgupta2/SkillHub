import { Metadata } from "next";
import AuthPage from "./AuthPage"

export const metadata:Metadata = {
  title: "Account Access – Login or Register | SkillHub",
  description:
    "Login or create your SkillHub account to access study materials, achievements, events, and resources.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: "Account Access – SkillHub",
    description:
      "Secure login and registration page for SkillHub users.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/auth`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Authentication",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SkillHub Account Access",
    description:
      "Login or register your SkillHub account securely.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};


export default function Page(){
  return <AuthPage/>
}
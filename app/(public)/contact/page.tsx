import { Metadata } from "next";
import ContactPage from "./Contact";


export const metadata:Metadata = {
  title: "Contact SkillHub – Get Support & Connect With Our Team",
  description:
    "Have questions or need support? Contact SkillHub for help with study resources, account issues, events, and platform features. We're here to support students and young developers.",
  keywords: [
    "Contact SkillHub",
    "SkillHub support",
    "student help",
    "education platform support",
    "contact student platform",
    "help center",
    "SkillHub team"
  ],
  openGraph: {
    title: "Contact SkillHub – We're Here to Help",
    description:
      "Reach out to SkillHub for support with study resources, accounts, achievements, and events.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact SkillHub Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SkillHub Support",
    description:
      "Need help with the platform? Contact the SkillHub support team for assistance.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};


export default function Page(){
  return <ContactPage/>
}
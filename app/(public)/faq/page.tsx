import FAQPage from "./FAQ";


export const metadata:Metadata = {
  title: "SkillHub FAQ – Answers to Student & College Queries",
  description:
    "Find answers to common questions about SkillHub, including study materials, XP points, institute portals, challenges, and collaboration opportunities.",
  keywords: [
    "SkillHub FAQ",
    "SkillHub help",
    "SkillHub question answers",
    "SkillHub student platform",
    "study materials help",
    "SkillHub XP points",
    "college portal FAQs"
  ],
  openGraph: {
    title: "SkillHub FAQ – Frequently Asked Questions",
    description:
      "Get clear answers to common questions about using SkillHub, resources, XP points, challenges, and institute features.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
    siteName: "SkillHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub FAQ Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub FAQs",
    description: "Clear answers to common questions about SkillHub and how it works.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export default function Page(){
  return <FAQPage/>
}
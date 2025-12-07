
import { Metadata } from "next";
import ArticlesPage from "./Articles";
export async function generateMetadata(): Promise<Metadata> {

  const title = "Latest Articles, Guides & Resources | SkillHub";
  const description ="Read latest articles on SkillHub. Explore guides, study resources, and expert-written content.";

  const keywords = [
    "SkillHub articles",
    "study articles",
    "student blogs",
    "learning guides",
    "education resources",
  ];

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/articles`;

  return {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      url,
      siteName: "SkillHub",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "SkillHub Articles",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
  };
}

export default function Page(){
    return <ArticlesPage/>
}

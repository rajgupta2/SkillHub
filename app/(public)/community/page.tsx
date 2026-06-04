
import { Metadata } from "next";
import ArticlesList from "@/components/article/ArticleListRender";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {

  const title = "Latest blogs, Guides, Articles & Resources on SkillHub";
  const description ="Read articles, blogs, guides, exam-key notes on SkillHub. Explore guides, study resources, and expert-written content.";

  const keywords = [
    "SkillHub blogs",
    "study blogs",
    "student blogs",
    "learning guides",
    "education resources",
    "Articles",
    "Blog",
    "Guides",
    "Exam Guide"
  ];

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/learn`;

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
          alt: "SkillHub Blogs",
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

export default async function Page(){
const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

const res =
  !token ?
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`)
    :
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
    });
    ;
  const data = await res.json();
  return <ArticlesList articles={data.articles} isStudentZone={false}/>
}

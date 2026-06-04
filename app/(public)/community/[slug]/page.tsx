import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/components/article/getArticle";
import { buildArticleMetadata } from "@/components/article/seo";
import ArticleRenderer from "@/components/article/ArticleRenderer";
import { cookies } from "next/headers";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const parameters=await params;
  const article = await getArticleBySlug(parameters.slug);
  return buildArticleMetadata(article);
}

export default async function TutorialPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const parameters=await params;


  const res =
    !token ?
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${parameters.slug}`)
      :
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${parameters.slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      });
      ;
  const data = await res.json();
  const statusCode=res.status;
  return <ArticleRenderer article={data.article}  statusCode={statusCode} isContentOwner={data.isContentOwner}/>;
}

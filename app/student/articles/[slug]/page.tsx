import { notFound } from "next/navigation";
import { buildArticleMetadata } from "@/components/article/seo";
import ArticleRenderer from "@/components/article/ArticleRenderer";
import { GET } from "@/app/api/find-token/route";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: PageProps) {
  const parameters=await params;
  const tokenRes = await GET();
  const dataToken = await tokenRes.json();
  const token=dataToken.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${parameters.slug}`, {
      credentials:"include",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      },
  });

  const data = await res.json();
  return <ArticleRenderer article={data.article} />;
}

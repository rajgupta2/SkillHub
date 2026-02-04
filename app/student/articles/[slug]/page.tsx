import { notFound } from "next/navigation";
import { getArticleByStudentZone } from "@/components/article/getArticle";
import { buildArticleMetadata } from "@/components/article/seo";
import ArticleRenderer from "@/components/article/ArticleRenderer";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: PageProps) {
  const parameters=await params;
  return <ArticleRenderer slug={parameters.slug} isStudentZone={true}/>;
}

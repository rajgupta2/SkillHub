import { notFound } from "next/navigation";
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

import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/components/article/getArticle";
import { buildArticleMetadata } from "@/components/article/seo";
import ArticleRenderer from "@/components/article/ArticleRenderer";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const parameters=await params;
  const article = await getArticleBySlug(parameters.slug,"TUTORIAL");
  return buildArticleMetadata(article);
}

export default async function TutorialPage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug, "TUTORIAL");
  if (!article || !article.isPublished) notFound();

  return <ArticleRenderer article={article} />;
}

"use client";
import ArticlesList from "@/components/article/ArticleListRender";

export default function ArticlesPage() {
  return <ArticlesList url={`${process.env.NEXT_PUBLIC_API_URL}/student/article`} isStudentZone={true}/>;
}
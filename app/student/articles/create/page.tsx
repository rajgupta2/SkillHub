"use client";
import CreateContent from "@/components/article/create"
import { getArticleByStudentZone } from "@/components/article/getArticle";
import { ArticleSchema } from "@/components/article/schema";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function Page(){
  const searchParams = useSearchParams();
  const slug=searchParams.get('slug');
  const type=searchParams.get('type');
  const [article, setArticle] = useState<ArticleSchema>();

  useEffect(() => {
    if (!slug || !type) return;
    const fetchArticle = async () => {
      const data = await getArticleByStudentZone(slug, type);
      setArticle(data);
    };

    fetchArticle();
  }, [slug, type]);
  return <CreateContent article={article}/>
}
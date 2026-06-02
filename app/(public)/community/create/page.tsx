"use client";
import CreateContent from "@/components/article/create";
import { ArticleSchema } from "@/components/article/schema";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

export async function getArticleByStudentZone(slug:string) {
  const tokenRes = await fetch(`/api/find-token`, {method: "GET"});
  const dataToken = await tokenRes.json();
  const token=dataToken.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${slug}`, {
      credentials:"include",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      },
  });

  const data = await res.json();
  console.log(data);
  return data.article;
}

export default function Page(){
  const searchParams = useSearchParams();
  const slug=searchParams.get('slug');
  const type=searchParams.get('type');
  const [article, setArticle] = useState<ArticleSchema>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (!slug || !type) return;
    const fetchArticle = async () => {
      const data = await getArticleByStudentZone(slug);
      setArticle(data);
    };

    fetchArticle();
  }, [slug, type]);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  if (!slug || !type) {
    return <CreateContent/>;
  }

  if (!article) {
    return <p>Loading article...</p>;
  }

  return <CreateContent article={article}/>
}
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
  return {article:data.article,statusCode:res.status};
}

export default function Page(){
  const searchParams = useSearchParams();
  const slug=searchParams.get('slug');
  const type=searchParams.get('type');
  const [data, setData] = useState<{article:ArticleSchema,statusCode:Number}>();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    if (!slug || !type) return;
    const fetchArticle = async () => {
      const data = await getArticleByStudentZone(slug);
      setData(data);
      setMounted(true);
    };

    fetchArticle();
  }, [slug]);

  if (!slug || !type) {
    return <CreateContent/>;
  }

  if (!mounted) {
    return <p>Loading...</p>;
  }

  if (data?.statusCode===401) {
    return <p>You are unauthorized to access the content.</p>;
  }

  return <CreateContent article={data?.article}/>
}
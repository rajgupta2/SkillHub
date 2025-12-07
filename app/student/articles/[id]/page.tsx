"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import DOMPurify from "dompurify";
import { Calendar, User, Clock, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleHead from "./ArticleHead";

// Interface from your backend
export interface Article {
  id: number;
  title: string;
  thumbnail?: string | null;
  content: string;
  contentMd: string;
  createdAt: string;
  author: {
    name: string;
  };
  _count: {
    likes: number;
  };
  tags: {
    id: number;
    articleId: number;
    tagName: string;
  }[];
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article| null>(null);
  const [loading, setLoading] = useState(true);

  // Function to estimate reading time
  const calculateReadingTime = (md: string) => {
    const words = md.trim().split(/\s+/).length;
    return Math.ceil(words / 180); // 180 words/min
  };

  useEffect(() => {
    async function loadArticle() {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`,{
            credentials:"include",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        console.error("Error loading article", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center text-gray-600">Loading article...</p>;
  }

  if (!article) {
    return <p className="p-10 text-center text-red-600">Article not found.</p>;
  }
  const readingTime = calculateReadingTime(article.contentMd);

  return (
    <>
    <ArticleHead article={article}/>
    <div className="min-h-screen pb-20">

      {/* BACK BUTTON */}
      <div className="px-2 md:px-6 py-2">
        <Link href="/student/articles">
          <Button variant="ghost" className="flex items-center gap-2 text-blue-600">
            <ArrowLeft className="w-5 h-5" /> Back to Articles
          </Button>
        </Link>
      </div>

    {/* COVER IMAGE */}
    {article.thumbnail && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" px-6 md:px-10"
      >
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-70 object-cover rounded-md"
        />
      </motion.div>
    )}

      {/* ARTICLE CONTENT */}
      <div className="mx-auto px-6 md:px-10 rounded-2xl shadow p-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl mt-4 font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              #{tag.tagName}
            </span>
          ))}
        </div>

        {/* CONTENT */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
        >
        </div>

        {/* META INFO */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6 pt-6">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {article.author.name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {new Date(article.createdAt).toDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {readingTime} min read
          </span>
        </div>

        {/* LIKE BUTTON
        <div className="mt-10 flex items-center gap-4">
          <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white">
            <Heart className="w-5 h-5" /> Like ({article._count.likes})
          </Button>
        </div>
        */}
      </div>
    </div>
  );
}

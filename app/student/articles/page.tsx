"use client";

import { motion } from "framer-motion";
import { PenSquare, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formateDate } from "@/components/formateDate";
import  DOMPurify from "dompurify";

export interface ArticleListItem {
  id: number;
  title: string;
  thumbnail?: string | null;
  content: string;
  contentMd:string;
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
  }[]
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);

  //  Fetch from backend API
  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/articles`,{
          credentials:"include"
        });
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error("Failed to load articles", err);
      }
    }
    loadArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* CLEAN HEADER (Inside Student Zone) */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-6 ">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Articles
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Read and share ideas with peers across SkillHub.
          </p>
        </div>

        <Link href="/student/articles/create">
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2 rounded-lg">
            <PenSquare className="w-5 h-5" /> Write Article
          </Button>
        </Link>
      </div>


      {/* ARTICLES */}
      <main className="px-6 md:px-20 py-8 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {articles.map((a, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white border border-blue-100 hover:shadow-xl transition group"
          >
            {/* Cover */}
            <div className="overflow-hidden">
              <img
                src={a.thumbnail!}
                alt={a.title}
                className="h-48 w-full object-cover transition group-hover:scale-110 duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {a.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3"
                 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(a.content).slice(0, 160) }}
               >
              </p>

              {/* Tag badges */}
              <div className="flex gap-2 flex-wrap mb-4">
                {a.tags?.map((t: any, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" /> {t.tagName}
                  </span>
                ))}
              </div>

              {/* Author + Date */}
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <User className="w-4 h-4 mr-1" /> {a.author?.name} &emsp;
                <Calendar className="w-4 h-4 mx-2" />
                {formateDate(a.createdAt)}
              </div>

              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={`/student/articles/${a.id}`}>Read Article</Link>
              </Button>
            </div>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <p className="text-center text-gray-600 col-span-full mt-10">
            No articles found. Be the first to write one!
          </p>
        )}
      </main>
    </div>
  );
}

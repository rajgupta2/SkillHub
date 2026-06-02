"use client";

import { motion } from "framer-motion";
import { PenSquare, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formateDate } from "@/components/formateDate";
import  DOMPurify from "dompurify";
import { ArticleSchema} from "@/components/article/schema";

export function getPlainText(html: string, maxLength = 160) {
  const text = html
    .replace(/<[^>]*>/g, " ")   // remove tags
    .replace(/\s+/g, " ")      // clean spaces
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}


function getCTA(type: ArticleSchema["type"]) {
  switch (type) {
    case "ARTICLE":
      return "Read article";
    case "GUIDE":
      return "View guide";
    case "EXAM":
      return "Practice now";
    default:
      return "Read article";
  }
}


export default function ArticlesList({
  articles,
  isStudentZone
}:{
  articles: ArticleSchema[];
  isStudentZone: boolean;
}) {
  const [filter, setFilter] = useState<"ALL" | ArticleSchema["type"]>("ALL");
  const filteredArticles=  filter === "ALL"
      ? articles
      : articles.filter((a) => a.type === filter);

  if(!articles || articles.length === 0 ){
    return (
      <p className="flex items-center justify-center min-h-[60vh] text-gray-600">
        No post found. <Link href={`/community/create`}>Try to write one!</Link>
      </p>
    );
  }


  const filterTypes = ["ALL", "BLOG", "ARTICLE", "EXAM", "GUIDE"] as const;
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* CLEAN HEADER (Inside Student Zone) */}
      <div className="flex flex-col md:flex-row items-center flex-cente justify-end px-6 md:px-10 py-6 ">
        {/* Filter Section */}
        <div className="flex flex-col  gap-4  px-4 md:px-10">
            <div className="flex gap-3 flex-wrap justify-center">
              { filterTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`${
                    filter === type
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  } px-6 py-2 rounded-full transition`}
                >
                  {type[0]+type.substring(1).toLowerCase()}
                </Button>
              ))}
              <Link href="/community/create">
                <Button className=" bg-blue-600 hover:bg-blue-700 text-white  gap-2 px-6 py-2 rounded-lg">
                  <PenSquare className="w-5 h-5" /> Start Writing..
                </Button>
              </Link>
            </div>
        </div>
      </div>


      {/* ARTICLES */}
      <main className="px-6 md:px-20 py-8 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {filteredArticles.map((a, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white border border-blue-100 hover:shadow-xl transition group"
          >
            {/* Content */}
            <div className="p-6">
              {/* Type badge */}
              <span className="inline-block mb-3 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {a.type}
              </span>

              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {a.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
               {getPlainText(a.contentHtml, 160)}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {a.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <User className="w-4 h-4 mr-1" />
                {a.author.name}
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mr-1" />
                {formateDate(a.createdAt)}
              </div>

              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={
                    a.isPublished ?
                     `/community/${a.slug}`
                    :
                     `/community/create?slug=${a.slug}&type=${a.type}`
                }>
                  {getCTA(a.type)}
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}

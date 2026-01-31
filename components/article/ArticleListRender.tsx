"use client";

import { motion } from "framer-motion";
import { PenSquare, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formateDate } from "@/components/formateDate";
import  DOMPurify from "dompurify";
import { ArticleSchema} from "@/components/article/schema";

function getPlainText(html: string, maxLength = 160) {
  if (typeof window === "undefined") return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent?.slice(0, maxLength) + "...";
}

function getCTA(type: ArticleSchema["type"]) {
  switch (type) {
    case "TUTORIAL":
      return "Start tutorial";
    case "GUIDE":
      return "View guide";
    case "EXAM":
      return "Practice now";
    default:
      return "Read article";
  }
}


export default function ArticlesList({
  url,
  isStudentZone
}:{
  url: string;
  isStudentZone: boolean;
}) {
  const [articles, setArticles] = useState<ArticleSchema[]>([]);
  const [filter, setFilter] = useState<"ALL" | ArticleSchema["type"]>("ALL");

  //  Fetch from backend API
  useEffect(() => {
    async function loadArticles() {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(url, {
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error("Failed to load articles", err);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles =
    filter === "ALL"
      ? articles
      : articles.filter((a) => a.type === filter);

  const filterTypes = ["ALL", "BLOG", "TUTORIAL", "EXAM", "GUIDE"] as const;
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* CLEAN HEADER (Inside Student Zone) */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-6 ">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Articles & Learning Resources
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Tutorials, blogs, guides, and exam prep shared by the SkillHub community.
          </p>
        </div>

        <Link href="/student/articles/create">
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2 rounded-lg">
            <PenSquare className="w-5 h-5" /> Start Writing..
          </Button>
        </Link>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap px-4 md:px-10">
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
                {getPlainText(a.contentHtml)}
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
                  isStudentZone?
                  `/student/articles/${a.slug}`
                  :
                  `${a.type}/${a.slug}`
                }>
                  {getCTA(a.type)}
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <p className="text-center text-gray-600 col-span-full mt-10">
            No articles/blogs found. Be the first to write one!
          </p>
        )}
      </main>
    </div>
  );
}

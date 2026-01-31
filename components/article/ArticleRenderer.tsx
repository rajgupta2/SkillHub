import { ArticleSchema } from "@/components/article/schema.js";
import { getArticleJsonLd } from "./seo";
import { User,Calendar } from "lucide-react";
export default function ArticleRenderer({ article}:{article:ArticleSchema}) {
  const jsonLd = getArticleJsonLd(article);
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Article UI */}
      <article className="prose max-w-2xl mx-auto mt-8 px-6 lg:px-0">
        <h1 className="mb-4">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {article.author.name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>


        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {article.tags.split(",").map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>

        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

        {/* LIKE BUTTON
        <div className="mt-10 flex items-center gap-4">
          <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white">
            <Heart className="w-5 h-5" /> Like ({article._count.likes})
          </Button>
        </div>
        */}

        <footer className="text-sm">
          Written by {article.author?.name}
        </footer>
      </article>
    </>
  );
}

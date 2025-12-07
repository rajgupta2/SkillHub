"use client";

import Head from "next/head";
import { Article } from "./page"; // adjust your path

export default function ArticleHead({ article }: { article: Article }) {
  const title = `${article.title} | SkillHub Articles`;

  // Fallback description from contentMd (truncate cleanly)
  const plainText = article.contentMd.replace(/[#_*`>]/g, ""); // remove markdown symbols
  const description =
    plainText.length > 160
      ? plainText.slice(0, 157) + "..."
      : plainText || article.title;

  // Keywords based on tags
  const keywords = [
    article.title,
    article.author?.name || "SkillHub writer",
    ...article.tags.map((t) => t.tagName),
    "SkillHub article",
    "student article",
    "study guide",
  ];

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.id}`;
  const thumbnail =
    article.thumbnail ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`;

  return (
    <Head>
      {/* ---------- Primary SEO Tags ---------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* ---------- Open Graph ---------- */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SkillHub" />
      <meta property="og:image" content={thumbnail} />

      {/* ---------- Twitter ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />

      {/* ---------- Article Specific ---------- */}
      <meta property="article:author" content={article.author?.name} />
      <meta property="article:published_time" content={article.createdAt} />
      {article.tags.map((t) => (
        <meta key={t.id} property="article:tag" content={t.tagName} />
      ))}
    </Head>
  );
}

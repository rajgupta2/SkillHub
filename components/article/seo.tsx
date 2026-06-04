import type { Metadata } from "next";
import { ArticleSchema } from "./schema";

export function buildArticleMetadata(article: ArticleSchema): Metadata {
  if (!article) return {};

  // Clean fallback description
  const description = article.metaDescription;
  const thumbnail =`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`;
  const canonical = article.canonicalUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL}/${article.type.toLowerCase()}/${article.slug}`;
  console.log(canonical);
  const keywords = [
    article.title,
    article.author?.name || "SkillHub writer",
    article.tags,
    `SkillHub ${article.type.toLowerCase()}`,
    "student article",
    "study guide",
    "learning content"
  ];

  return {
    title: article.metaTitle,
    description,
    keywords,
    robots: {
      index: !article.noIndex,      //if noindex->true means  the page will not be google indexed.
      follow: true,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: article.metaTitle ?? article.title,
      description,
      type: "article",
      url: canonical,

      siteName: "SkillHub",
      images: [{ url: thumbnail }],

      authors: [article.author?.name],
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      tags: article.tags.split(","),
    },

    twitter: {
      card: "summary_large_image",
      title: article.metaTitle ?? article.title,
      description,
      images: [thumbnail],
    },
  };
}

function getSchemaType(type: ArticleSchema["type"]) {
  switch (type) {
    case "BLOG":
      return "BlogPosting";
    case "ARTICLE":
      return "HowTo";
    case "INTERVIEW":
      return "Article";
    default:
      return "Article";
  }
}

export function getArticleJsonLd(article: ArticleSchema) {
  return {
    "@context": "https://schema.org",
    "@type": getSchemaType(article.type),
    headline: article.title,
    description: article.metaDescription,
    author: {
      "@type": "Person",
      name: article.author?.name || "SkillHub Writer",
    },
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${article.type.toLowerCase()}/${article.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "SkillHub",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
      },
    },
    keywords: article.tags, // optional but okay here
  };
}
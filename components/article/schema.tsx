export interface ArticleSchema {
  id:           number;
  title:        string;
  slug:         string;
  contentHtml:  string;
  contentJson:  any;

  // SEO (IMPORTANT)
  metaTitle?:       string;
  metaDescription?: string;
  canonicalUrl?:    string;
  noIndex:          boolean;

  // Classification
  type:            "BLOG" | "ARTICLE" | "EXAM" | "GUIDE";
  isPublished:     boolean;

  // Relations
  author: {
    name: string;
  };
  tags: string;
  _count: {
    likes: number;
  };

  createdAt: string;
  updatedAt: string;
}

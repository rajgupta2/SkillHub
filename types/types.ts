export interface S3File {
  id: number;
  originalName: string;
  s3Key: string;
  url: string;
  contentType: string;
  materialId: number;
}

export interface College {
  id: number;
  name: string;
  city: string;
  district: string;
  state: string;
}

export interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  description: string;
  uploadedBy: {
    name: string;
    email?: string;
    profile: {
      college?: College;
    } | null;
  };
  createdAt: string;
  files: S3File[];
  studentId: string | null;
  collegeId: number | null;
}

export interface Course {
  id: number;
  name: string;
}

export interface ArticleSchema {
  id: number;
  title: string;
  slug: string;
  contentHtml: string;
  contentJson: any;

  // SEO (IMPORTANT)
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex: boolean;

  // Classification
  type: "BLOG" | "ARTICLE" | "INTERVIEW";
  isPublished: boolean;

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

import type { PartialBlock } from "@blocknote/core";

export interface UICourse {
  _id: any; // mongoId OR localCourseId
  title: string;
  description?: string;
  slug: string;

  links: {
    linkId: string;
    title: string;
    order: number;
    content?: PartialBlock[];
    slug: string;
  }[];

  status: "published" | "draft";

  owner: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export interface Peers {
  name: string;
  profile: { course: { name: string }; startYear: number; endYear: number };
}


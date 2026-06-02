import type { PartialBlock } from "@blocknote/core";

export type UICourse = {
  _id: any; // mongoId OR localCourseId
  title: string;
  description?: string;
  slug:string;

  links: {
    linkId: string;
    title: string;
    order: number;
    content?: PartialBlock[];
  }[];

  status: "published" | "draft";

  owner: {
    name: string;
    email: string;
  };
  createdAt:string;
  updatedAt: string;
};

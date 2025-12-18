import type { PartialBlock } from "@blocknote/core";

export type UICourse = {
  id: string; // mongoId OR localCourseId
  title: string;
  description?: string;

  links: {
    linkId: string;
    title: string;
    order: number;
    content?: PartialBlock[];
  }[];

  source: "server" | "local-draft" | "local-edited";

  owner?: {
    name: string;
    email: string;
  };

  updatedAt: number | string;
};

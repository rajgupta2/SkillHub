import { openDB, DBSchema } from "idb";
import type { PartialBlock } from "@blocknote/core";

export interface CourseDB extends DBSchema {
  courses: {
    key: string; // localCourseId (uuid)
    value: {
      localCourseId: string;

      title: string;
      description?: string;

      status: "draft" | "edited" | "published";

      links: {
        linkId: string;
        title: string;
        order: number;
        content?: PartialBlock[];
      }[];

      owner?: {
        name: string;
        email: string;
      };

      createdAt: number;
      updatedAt: number;
    };

    indexes: {
      "by-owner-email": string;
      "by-status": string;
    };
  };
}

let dbPromise: ReturnType<typeof openDB<CourseDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB can only be used in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB<CourseDB>("course-db", 1, {
      upgrade(db) {
        const store = db.createObjectStore("courses", {
          keyPath: "localCourseId",
        });

        store.createIndex("by-owner-email", "owner.email");
        store.createIndex("by-status", "status");
      },
    });
  }

  return dbPromise;
}
import { openDB, DBSchema } from "idb";
import type { PartialBlock } from "@blocknote/core";

export interface CourseDB extends DBSchema {
  courses: {
    key: string; // slug
    value: {
      localCourseId: string;
      slug: string;
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
      "by-status": string;
    };
  };
}

let dbPromise: ReturnType<typeof openDB<CourseDB>> | null = null;

const DB_NAME = "course-db";
const DB_VERSION = 2;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB can only be used in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB<CourseDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore("courses", {
          keyPath: "slug",
        });
      },
    });
  }

  return dbPromise;
}

function deleteCourseDBOnce() {
  if (typeof window === "undefined") return;

  const RESET_KEY = "idb_course_db_reset_v2";

  // already reset → do nothing
  if (localStorage.getItem(RESET_KEY) === "true") {
    return;
  }

    console.warn("🧹 Attempting IndexedDB delete: course-db");

  const req = indexedDB.deleteDatabase("course-db");

  req.onsuccess = () => {
    console.log("✅ IndexedDB deleted");
    localStorage.setItem(RESET_KEY, "true");
  };

  req.onerror = () => {
    console.error("❌ IndexedDB delete failed", req.error);
    // DO NOT set flag
  };
}
deleteCourseDBOnce();
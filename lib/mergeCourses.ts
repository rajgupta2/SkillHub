import { UICourse } from "./courseSchema";
import { getAllLocalCourses } from "@/lib/course-idb";

export async function fetchLocalCourses() {
  return getAllLocalCourses();
}


export async function fetchServerCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

/*
Rule:
Local always overrides server
Drafts always appear
Edited copies replace published ones (for that user)
*/

export function mergeCourses(
  serverCourses: any[],
  localCourses: any[]
): UICourse[] {
  const map = new Map<string, UICourse>();

  // 1️⃣ Add server courses
  serverCourses.forEach((course) => {
    map.set(course._id, {
      id: course._id,
      title: course.title,
      description: course.description,
      links: course.links,
      source: "server",
      owner: course.owner,
      updatedAt: course.updatedAt,
    });
  });

  // 2️⃣ Add / override with local courses
  localCourses.forEach((local) => {
    const uiCourse: UICourse = {
      id: local.localCourseId,
      title: local.title,
      description: local.description,
      links: local.links,
      source: local.status === "draft"
        ? "local-draft"
        : "local-edited",
      owner: local.owner,
      updatedAt: local.updatedAt,
    };

    // If this local course is an edit of a published one
    // (future-proofing)
    if ((local as any).publishedCourseId) {
      map.set((local as any).publishedCourseId, uiCourse);
    } else {
      map.set(local.localCourseId, uiCourse);
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
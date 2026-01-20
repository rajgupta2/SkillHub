import { getDB } from "./db";
import { CourseDB } from "./db";

/**
 * Create / Update a course
 */
export async function saveLocalCourse(course: CourseDB["courses"]["value"]) {
  const db = await getDB();
  await db.put("courses", {
    ...course,
    updatedAt: Date.now(),
  });
}

/**
 * Get all local courses
*/
export async function getAllLocalCourses() {
  const db = await getDB();
  return db.getAll("courses");
}

export async function getLocalCourseById(courseId:string) {
  const db = await getDB();
  return db.get("courses", courseId);
}

/**
 * Get draft courses only
 */
// export async function getDraftCourses() {
//   const db = await getDB();
//   return db.getAllFromIndex("courses", "by-status", "draft");
// }

/**
 * Get courses by owner email
 */
// export async function getCoursesByOwner(email: string) {
//   const db = await getDB();
//   return db.getAllFromIndex("courses", "by-owner-email", email);
// }

/**
 * Delete local course
 */
export async function deleteLocalCourse(localCourseId: string) {
  const db = await getDB();
  await db.delete("courses", localCourseId);
}

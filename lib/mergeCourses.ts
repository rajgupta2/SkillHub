import { UICourse } from "./courseSchema";

export async function fetchServerCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
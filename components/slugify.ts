import slugify from "slugify";

export function generateCourseSlug(title: string) {
  if(!title) return;
  title=title.trim();
  return `${slugify(title, { lower: true })}`;
}
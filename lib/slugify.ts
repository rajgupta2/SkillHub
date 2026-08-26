import slugify from "slugify";

export function generateLinkSlug(title: string) {
  if (!title) return;
  title = title.trim();
  return `${slugify(title, { lower: true })}`;
}

export function getPlainText(html: string, maxLength = 160) {
  const text = html
    .replace(/<[^>]*>/g, " ") // remove tags
    .replace(/\s+/g, " ") // clean spaces
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
export async function getArticleBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${slug}`);
  const data = await res.json();
  return data.article;
}

export async function getArticleBySlug(slug:string,type:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${slug}?type=${type}`);
    const data = await res.json();
    return data.article;
}



export async function getArticleByStudentZone(slug:string,type:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${slug}?type=${type}`);
    const data = await res.json();
    return data.article;
}
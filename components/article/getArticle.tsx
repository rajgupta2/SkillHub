export async function getArticleBySlug(slug:string,type:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${slug}?type=${type}`);
    const data = await res.json();
    return data.article;
}



export async function getArticleByStudentZone(slug:string,type:string) {
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${slug}?type=${type}`, {
        credentials:"include",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return data.article;
}
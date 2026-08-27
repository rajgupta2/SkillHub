import { getArticleBySlug } from "./getArticle";
import { buildArticleMetadata } from "./seo";
import ArticleRenderer from "./ArticleRenderer";
import { cookies } from "next/headers";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const parameters=await params;
  const article = await getArticleBySlug(parameters.slug);
  return buildArticleMetadata(article);
}

export default async function TutorialPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const parameters=await params;


  const res =
    !token ?
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${parameters.slug}`)
      :
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article/${parameters.slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      });
      ;
  const data = await res.json();
  const statusCode=res.status;
  if(statusCode===401){
    return (
      <div className="flex items-center justify-center min-h-[85vh] text-gray-700">
        You are unauthorized to access the content;
      </div>
    );
  }
  return <ArticleRenderer article={data.article} isContentOwner={data.isContentOwner}/>;
}

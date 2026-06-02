import { GET } from "@/app/api/find-token/route";
import ArticlesList from "@/components/article/ArticleListRender";
import UploadPage from "./Uploads";

export default async function MyUploads() {
  const tokenRes = await GET();
  const dataToken = await tokenRes.json();
  const token=dataToken.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/article`, {
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return <UploadPage articles={data.articles} isStudentZone={true}/>
}
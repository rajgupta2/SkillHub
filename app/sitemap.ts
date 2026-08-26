import { MetadataRoute } from "next";
import { generateLinkSlug } from "@/lib/slugify";
import { ArticleSchema } from "@/types/types";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function courseURL() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  if (!res.ok) return [];
  let courses = await res.json();
  courses=Array.isArray(courses)?courses:[];
  const courseLinks = courses.flatMap((course: any) =>
    course.links.map((l: any) => ({
      url: `${baseUrl}/tutorials/${course.slug}/${l.slug}`,
      lastModified: new Date(course.updatedAt),
    }))
  );
  return courseLinks;
}

async function articleURL() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`);
    if (!res.ok) return [];
    const data = await res.json();
    const articles=data.articles;
    const articleLinks=articles.map((a:ArticleSchema)=>{
      return {
        url: `${baseUrl}/community/${a.slug}`,
        lastModified: new Date(a.updatedAt),
      }
    })
    return articleLinks;
}

async function materialLinks(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material?limit=150`);
  if (!res.ok) return [];
  let data = await res.json();
  const materials=Array.isArray(data.materials)?data.materials:[];

  const materialLinks = materials.map((material: any) => ({
    url: `${baseUrl}/resources/${generateLinkSlug(material.title)}/${material.id}`,
    lastModified: new Date(material.createdAt),
  }));

  return materialLinks;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const courseLinks = await courseURL();
  const materialLink=await materialLinks();
  const articleLinks=await articleURL();
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    //Tutorials pages
    ...courseLinks,

    //Material links
    ...materialLink,

    //Articles Blog Tutorial links
    ...articleLinks,

    // Public pages
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/community`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/tutorials`, lastModified: new Date(), priority: 0.9 },

    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.8 },


    // Auth pages
    { url: `${baseUrl}/auth/`, lastModified: new Date(), priority: 0.8 },
  ];
}

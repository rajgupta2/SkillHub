import { MetadataRoute } from "next";
import { generateLinkSlug } from "@/lib/slugify";
import { ArticleSchema, UICourse, Tutorial } from "@/types/types";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function courseURL() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  if (!res.ok) return [];

  const courses = await res.json();
  const courseURL: any = [];

  courses.forEach(async (c:UICourse) => {
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${c.slug}`);
    if (!res2.ok) return;
    const tutorials=await res2.json();
    tutorials.links.forEach( (t : Tutorial) => {
      const link={
        url: `${baseUrl}/tutorials/${c.slug}/${t.slug}`,
        lastModified: new Date(t.updatedAt),
      }
      courseURL.push(link);
    });
  });
  return courseURL;
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

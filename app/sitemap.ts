import { MetadataRoute } from "next";
import { generateCourseSlug } from "@/components/slugify";

async function courseURL() {
  const baseUrl = "https://skillhub-student.vercel.app";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  if (!res.ok) return [];
  let courses = await res.json();
  courses=Array.isArray(courses)?courses:[];
  const courseLinks = courses.flatMap((course: any) =>
    course.links.map((l: any) => ({
      url: `${baseUrl}/course/${course.slug}/${generateCourseSlug(l.title)}`,
      lastModified: new Date(course.updatedAt),
    }))
  );
  return courseLinks;
}

async function materialLinks(){
  const baseUrl = "https://skillhub-student.vercel.app";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material?limit=150`);
  if (!res.ok) return [];
  let data = await res.json();
  console.log(data.materials);
  const materials=Array.isArray(data.materials)?data.materials:[];

  const materialLinks = materials.map((material: any) => ({
    url: `${baseUrl}/materials/${generateCourseSlug(material.title)}/${material.id}`,
    lastModified: new Date(material.createdAt),
  }));

  return materialLinks;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const baseUrl = "https://skillhub-student.vercel.app";
  const courseLinks = await courseURL();
  const materialLink=await materialLinks();
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    //Tutorials pages
    ...courseLinks,

    //Material links
    ...materialLink,

    // Public pages
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.8 },

    // Auth pages
    { url: `${baseUrl}/auth/`, lastModified: new Date(), priority: 0.6 },
  ];
}

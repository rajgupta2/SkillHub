import { MetadataRoute } from "next";

async function courseURL() {
  const baseUrl = "https://skillhub-student.vercel.app";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  const courses = await res.json();

  const courseLinks = courses.flatMap((course: any) =>
    course.links.map((l: any) => ({
      url: `${baseUrl}/course/${course.slug}/${l.title
        .split(" ")
        .join("-")
        .toLowerCase()}`,
      lastModified: new Date(course.updatedAt),
    }))
  );
  return courseLinks;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const baseUrl = "https://skillhub-student.vercel.app";
  const courseLinks = await courseURL();
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    //Tutorials pages
    ...courseLinks,

    // Public pages
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.8 },

    // Auth pages
    { url: `${baseUrl}/auth/`, lastModified: new Date(), priority: 0.6 },
  ];
}

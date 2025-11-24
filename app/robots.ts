import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/student/", "/admin/", "/college/"], // private zones
    },
    sitemap: "https://skillhub-student.vercel.app/sitemap.xml",
  };
}

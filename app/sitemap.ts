import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skillhub-student.vercel.app";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    // Public pages
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.8 },

    // Auth pages
    { url: `${baseUrl}/auth/`, lastModified: new Date(), priority: 0.6 },

    // Student Zone
    { url: `${baseUrl}/student`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/materials`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/leaderboard`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/resources`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/profile`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/contribute`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/suggestion`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/articles`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/articles/create`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/student/logout`, lastModified: new Date(), priority: 0.7 },
  ];
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { GraduationCap } from "lucide-react";
import { cookies } from "next/headers";
import {wakeupBackendServer} from "../run";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SkillHub – Connect, Learn, and Grow with College Peers | Student Resources & Achievements",
  description:
    "SkillHub is a modern platform to share PYQs, projects, tutorials, articles, blogs, and achievements and find high-quality study resources to grow your skills.",
  keywords: [
    "SkillHub",
    "Learner platform",
    "student resources",
    "college resources",
    "study materials",
    "projects for students",
    "Learning",
    "Tutorials",
    "Previous Year Question Papers",
    "tech community",
    "operating system tutorial",
    "javascript tutorial"
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "SkillHub – Empowering Learners Together",
    description:
      "Join SkillHub to discover PYQs, projects, tutorials, blogs, and connect with peers.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "SkillHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillHub Student Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub – Connect, Learn, and Grow",
    description:
      "SkillHub is an online platform for learners to share knowledge, tutorials, PYQs, blogs  and collaborate on learning. Join SkillHub to share resources and grow together with your college community.",
    images: ["/og-image.png"],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn:boolean = cookieStore.get("user")?.value ? true :false;
  wakeupBackendServer();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/graduation-cap.svg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteNavbar isLoggedIn={isLoggedIn} />
          {children}
        <SiteFooter />
      </body>
    </html>
  );
}

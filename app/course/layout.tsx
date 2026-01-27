import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { cookies } from "next/headers";
import {wakeupBackendServer} from "../run";
import CoursePage from "./CourseLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SkillHub – Tutorials for Beginners & Interviews Preparation",
  description:
    "SkillHub tutorial is beginner and interview preparation friendly. The tutorial is also best for fast and last minute revision.",
  keywords: [
    "SkillHub tutorials",
    "skillhub student platform",
    "Operating System tutorial",
    "JavaScript tutorial",
    "tech community"
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "SkillHub – Tutorials for Beginners & Interviews Preparation",
    description:
      "Join SkillHub to find last minute preparation tutorials and beginner friendly tutorials.",
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
    title: "SkillHub – Tutorials for Beginners & Interviews Preparation",
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
        <CoursePage isLoggedIn={isLoggedIn}>
          {children}
        </CoursePage>
      </body>
    </html>
  );
}

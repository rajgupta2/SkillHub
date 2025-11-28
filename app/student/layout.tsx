
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StudentBar from "@/components/StudentBar";
import {wakeupBackendServer} from "../run";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const generateMetadata = async (): Promise<Metadata> => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const studentName= userCookie  ? JSON.parse(userCookie)?.name : "Student"; // fetch dynamically if needed
  return {
    title: `Student Dashboard – ${studentName} | SkillHub`,
    description: `Welcome ${studentName} to your SkillHub dashboard. Track your achievements and explore learning opportunities.`,
    openGraph: {
      title: `Student Dashboard – ${studentName} | SkillHub`,
      description: `Welcome ${studentName} to your SkillHub dashboard. Track your achievements and explore learning opportunities.`,
      images: [
        {
          url: `/og-image.png`, // dynamic OG image
          width: 1200,
          height: 630,
          alt: `${studentName}'s Dashboard`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Student Dashboard – ${studentName} | SkillHub`,
      description: `Welcome ${studentName} to your SkillHub dashboard.`,
      images: [`/og-image.png`],
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const studentName= userCookie  ? JSON.parse(userCookie).name : "Student";
  wakeupBackendServer();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/graduation-cap.svg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <StudentBar upcomingChildren={children} studentName={studentName} />
      </body>
    </html>
  );
}

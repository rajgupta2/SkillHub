import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import {wakeupBackendServer} from "@/app/run";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //wakeupBackendServer();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/graduation-cap.svg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

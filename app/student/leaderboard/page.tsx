import LeaderboardPage from "./Leaderboard";

export const metadata = {
  title: "Leaderboard – Top Students | SkillHub Rankings",
  description:
    "View SkillHub’s live leaderboard ranking top students across college, district, and zonal levels based on XP points and contributions.",
  keywords: [
    "SkillHub leaderboard",
    "student rankings",
    "college leaderboard",
    "district leaderboard",
    "zonal leaderboard",
    "XP points",
    "top students",
    "student ranking platform",
  ],
  openGraph: {
    title: "SkillHub Leaderboard – College, District & Zonal Rankings",
    description:
      "Explore real-time student rankings across multiple levels on SkillHub. Compare XP points and contributions from top performers.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/leaderboard`,
    siteName: "SkillHub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SkillHub Leaderboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub Leaderboard – Top Student Rankings",
    description:
      "Track student rankings at college, district, and zonal levels on SkillHub.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
};

export default function Page(){
  return <LeaderboardPage/>
}

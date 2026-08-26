import {
  BookOpen,
  Users,
  Trophy,
  Building2,
  Lightbulb,
  Upload,
  Layers,
  PenBoxIcon,
  WavesLadder,
} from "lucide-react";

export const skillHubWork = [
  {
    icon: <Building2 className="text-blue-600 w-10 h-10 mb-4" />,
    title: "Get Your College Space",
    desc: "Register yourself and unlock a dedicated space for resources, learning, and student activities.",
    color: "border-blue-600",
  },
  {
    icon: <Upload className="text-yellow-500 w-10 h-10 mb-4" />,
    title: "Upload & Share",
    desc: "Upload notes, assignments, projects, and previous-year papers to help your fellow students.",
    color: "border-yellow-500",
  },
  {
    icon: <PenBoxIcon className="text-purple-500 w-10 h-10 mb-4" />,
    title: "Create & Write",
    desc: "Write articles, blogs, tutorials, and guides to showcase your knowledge and help others learn.",
    color: "border-purple-500",
  },
  {
    icon: <Lightbulb className="text-green-500 w-10 h-10 mb-4" />,
    title: "Learn & Grow",
    desc: "Explore courses, tutorials, and valuable resources to build your skills and knowledge.",
    color: "border-green-500",
  },
  {
    icon: <WavesLadder className="text-orange-500 w-10 h-10 mb-4" />,
    title: "Compete & Earn",
    desc: "Complete challenges, earn XP, climb the leaderboard, and get recognized for your achievements.",
    color: "border-orange-500",
  },
];

export const features=[
    {
        icon: <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-4" />,
        title: "Study Materials",
        desc: "Access curated study notes, PYQs, and assignments from your peers.",
    },
    {
        icon: <Upload className="w-10 h-10 text-yellow-500 mx-auto mb-4" />,
        title: "Easy Upload",
        desc: "Seamlessly upload and organize learning materials in your college hub.",
    },
    {
        icon: <Users className="w-10 h-10 text-green-600 mx-auto mb-4" />,
        title: "College Network",
        desc: "Connect with students, peers and creators across the SkillHub community.",
    },
    {
        icon: <Trophy className="w-10 h-10 text-red-500 mx-auto mb-4" />,
        title: "Leaderboards",
        desc: "Compete with colleges and students regionally to earn recognition.",
    },
    {
        icon: <Layers className="w-10 h-10 text-indigo-600 mx-auto mb-4" />,
        title: "Centralized Access",
        desc: "One place for every college resource, accessible anytime.",
    }
];

export const reviews=[
    {
        text: "SkillHub helped us organize all our study resources in one place!",
        name: "Aditi Sharma",
        college: "B.Tech 2nd Year",
        color: "border-blue-600",
    },
    {
        text: "I love the leaderboard — it keeps me motivated to upload and learn.",
        name: "Rajesh Patel",
        college: "B.Tech 3rd Year",
        color: "border-yellow-400",
    },
    {
        text: "Finally, a platform where students can actually collaborate effectively.",
        name: "Sneha Verma",
        college: "CS Student",
        color: "border-green-500",
    }
];
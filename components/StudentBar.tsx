"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  CodeXml,
  Home,
  BookOpen,
  Trophy,
  Building2,
  User,
  LogOut,
  GraduationCap,
  FilePlus,
  Lightbulb,
  PenSquare,
  PercentSquare
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StudentBarProps {
  upcomingChildren: React.ReactNode;
  studentName: string;
}


export default function StudentLayout({ upcomingChildren, studentName }: StudentBarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  const links = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/student" },
    // { name: "Materials", icon: <BookOpen className="w-5 h-5" />, href: "/student/materials" },
    // { name: "Challenges", icon: <CodeXml className="w-5 h-5" />, href: "/student/challenges" },
    { name: "Leaderboard", icon: <Trophy className="w-5 h-5" />, href: "/student/leaderboard" },
    { name: "College Resources", icon: <Building2 className="w-5 h-5" />, href: "/student/resources" },
    { name: "Profile", icon: <User className="w-5 h-5" />, href: "/student/profile" },
    { name: "Contribute", icon: <FilePlus className="w-5 h-5" /> , href: "/student/contribute" },
    { name: "Suggestion", icon: <Lightbulb className="w-5 h-5" /> , href: "/student/suggestion" },
    { name: "Articles", icon: <PenSquare className="w-5 h-5" />, href: "/student/articles" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen flex flex-col bg-gradient-to-b from-blue-800 to-blue-600 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-blue-600">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-yellow-400" />
            <span className="font-bold text-2xl text-white">SkillHub</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col overflow-y-auto gap-2 px-4 pt-6 py-16">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-600 text-gray-100"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
            <Link
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                await fetch("/api/logout", { method: "POST" });
                router.push("/auth");
              }}
              className="flex items-center gap-3 px-3 py-2   text-red-200 rounded-lg transition hover:bg-blue-600">
              <LogOut className="w-5 h-5" /> Logout
            </Link>
        </nav>

        {/* Logout Link */}

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-blue-500 px-4 py-4 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} SkillHub
          <br /> Empowering Learners Together
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white border-b border-blue-100 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-blue-700 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
              Student Zone
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-gray-700 font-medium">
              Hello, {studentName?.split(" ")[0]}
            </span>
            <Image
              src="/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto min-h-[83vh] ">{upcomingChildren}</main>

        {/* Page Footer */}
        <footer className="bg-white border-t mt-auto text-center py-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} SkillHub — Empowering Learners Together
        </footer>
      </div>
    </div>
  );
}

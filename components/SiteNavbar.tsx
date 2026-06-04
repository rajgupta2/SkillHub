"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "radix-ui";

export  default function SiteNavbar({isLoggedIn}:{isLoggedIn:boolean}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function ProfileLinks(){
  return (
    <>
      <Link
        href="/student"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Dashboard
      </Link>

      <Link
        href="/student/account"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Account Settings
      </Link>

      <Link
        href="/student/college"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        My College
      </Link>

      <Link
        href="/student/contribute"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Contribute
      </Link>

      <Link
        href="/student/uploads"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        My uploads
      </Link>

      <Link
        href="/student/suggestion"
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Suggestions
      </Link>

      <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
        onClick={async (e) => {
          e.preventDefault();
          await fetch("/api/logout", { method: "POST" });
          router.push("/auth");
          router.refresh();
        }}
        >
          Logout
        </button>
      </>
    )
  }
  function Profile(){
    const [profileOpen, setProfileOpen] = useState(false);
    return (
      <div className="relative group">
        {/* Profile Button */}
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Profile <ChevronDown className="h-4 w-4 inline" />
        </button>

          {/* mobile menu */}
          <div
            className={`
              md:hidden
              ${profileOpen ? "block" : "hidden"}
            `}
          >
            <ProfileLinks/>
          </div>

          {/* desktop dropdown */}
          <div
            className="
              hidden
              md:group-hover:block
              md:absolute
              md:right-0
              md:w-56
              md:bg-white
              md:border
              md:rounded-lg
              md:shadow-lg
            "
          >
              <ProfileLinks/>
        </div>
      </div>
    )
  }
  return (
    <nav className="bg-white shadow top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-blue-600" />
          <span className="font-bold text-2xl text-blue-700">SkillHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
          { /* <Link href="/challenges">Challenges</Link>
          <Link href="/leaderboard">Leaderboard</Link> */}
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/community">Community</Link>

          {isLoggedIn
          ?
            <Profile/>
          : (
            <Link
              href="/auth"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="flex flex-col p-4 gap-3 text-gray-700 font-medium">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/resources" onClick={() => setOpen(false)}>Resources</Link>
            { /*
              <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
              <Link href="/challenges" onClick={() => setOpen(false)}>Challenges</Link>
              <Link href="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link> */}
            <Link href="/tutorials" onClick={() => setOpen(false)}>Tutorials</Link>
            <Link href="/community" onClick={() => setOpen(false)}>Community</Link>

            {isLoggedIn
             ?
            <Profile/>
            : (
              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

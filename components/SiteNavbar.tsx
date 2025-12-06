"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

export  default function SiteNavbar({isLoggedIn}:{isLoggedIn:Boolean}) {
  const [open, setOpen] = useState(false);

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
          <Link href="/about">About</Link>
          <Link href="/materials">Resources</Link>
          { /* <Link href="/challenges">Challenges</Link>
          <Link href="/leaderboard">Leaderboard</Link> */}
          <Link href="/faq">FAQs</Link>
          <Link href="/contact">Contact</Link>

          {isLoggedIn ? (
            <Link
              href="/student"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Dashboard
            </Link>
          ) : (
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
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/materials" onClick={() => setOpen(false)}>Resources</Link>

            { /*
              <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
              <Link href="/challenges" onClick={() => setOpen(false)}>Challenges</Link>
              <Link href="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link> */}
            <Link href="/faq" onClick={() => setOpen(false)}>FAQs</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

            {isLoggedIn ? (
              <Link
                href="/student"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Dashboard
              </Link>
            ) : (
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

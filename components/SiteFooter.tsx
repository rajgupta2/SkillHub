import Link from "next/link";
import { GraduationCap, Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-blue-900 text-blue-100 pt-12 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-7 h-7 text-yellow-400" />
            <span className="text-2xl font-bold text-white">SkillHub</span>
          </div>
          <p className="text-sm opacity-80">
            Empowering students through collaborative learning, shared knowledge, and healthy competition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            {/*<li><Link href="/leaderboard">Leaderboard</Link></li>*/}
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-white">Legal</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/terms">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-white">Connect</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {process.env.NEXT_PUBLIC_EMAIL}
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-yellow-400 transition" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-yellow-400 transition" /></Link>
            <Link href="#"><Linkedin className="w-5 h-5 hover:text-yellow-400 transition" /></Link>
            <Link href="#"><Github className="w-5 h-5 hover:text-yellow-400 transition" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-800 mt-10 pt-6 text-center text-sm opacity-70">
        <p>© {new Date().getFullYear()} SkillHub — All Rights Reserved.</p>
      </div>
    </footer>
  );
}

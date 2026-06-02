"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css"
export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto items-center justify-center gap-10 px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/student-lost.png" // 👈 put any fun illustration (like “student confused”)
                alt="Page Not Found"
                width={280}
                height={200}
                className="drop-shadow-lg inline"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=" text-blue-700"
            >
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600"
            >
              Looks like you took a wrong turn in the SkillHub universe.
              Let&apos;s get you back on track to learning greatness!
            </motion.p>

            {/* Home Button */}
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
                  Go Back Home
                </Button>
              </Link>
            </motion.div>
          </div>
    </>
  );
}

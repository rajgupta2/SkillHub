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
      <SiteNavbar/>
          <div className=" flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-16 text-center">

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Image
                src="/student-lost.png" // 👈 put any fun illustration (like “student confused”)
                alt="Page Not Found"
                width={380}
                height={300}
                className="mx-auto drop-shadow-lg"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-blue-700 mb-3"
            >
              Lost in Learning?
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg mx-auto mb-6"
            >
              Looks like you took a wrong turn in the SkillHub universe.
              Let’s get you back on track to learning greatness!
            </motion.p>

            {/* Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-md">
                  Go Back Home
                </Button>
              </Link>
            </motion.div>
          </div>
      <SiteFooter/>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Users,
  Globe,
  Target,
  BookOpen,
  Trophy,
  Building2,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, Rocket } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 ">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-300">SkillHub</span>
          </h1>
          <p className="text-lg opacity-90 mb-8">
            We’re on a mission to connect every student with knowledge, peers,
            and opportunities — transforming how learning happens at college.
          </p>
          <Button
            asChild
            className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-3 rounded-lg shadow-lg"
          >
            <Link href="/auth">Join SkillHub</Link>
          </Button>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/students-collaborating.png"
            alt="Learning Illustration"
            width={800}
            height={400}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          Our Mission & Vision
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-blue-50 rounded-xl shadow-md border-t-4 border-blue-600"
          >
            <Lightbulb className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To create a collaborative learning platform where students can
              share study materials, solve challenges, and grow their skills
              together, preparing for both academics and industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-yellow-50 rounded-xl shadow-md border-t-4 border-yellow-400"
          >
            <Rocket className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-yellow-600 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become India’s leading digital student ecosystem where every
              college has its online hub of resources, competitions, and
              peer-driven motivation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          What Makes SkillHub Unique
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <BookOpen className="text-blue-600 w-10 h-10 mb-4" />,
              title: "Study Materials",
              desc: "Access and upload assignments, PYQs, and notes tailored for your college and branch.",
            },
            {
              icon: <Trophy className="text-yellow-500 w-10 h-10 mb-4" />,
              title: "Leaderboard Competitions",
              desc: "Participate in district and zonal challenges to earn XP and climb the SkillHub ranks.",
            },
            {
              icon: <Building2 className="text-blue-600 w-10 h-10 mb-4" />,
              title: "College Portals",
              desc: "Every institute gets its own mini-site to host resources and track student progress.",
            },
            {
              icon: <Users className="text-green-600 w-10 h-10 mb-4" />,
              title: "Student Network",
              desc: "Collaborate with thousands of students and alumni for knowledge and growth.",
            },
            {
              icon: <Lightbulb className="text-orange-500 w-10 h-10 mb-4" />,
              title: "Skill Development",
              desc: "Engage in coding labs, projects, and guided courses to build employable skills.",
            },
            {
              icon: <Target className="text-pink-500 w-10 h-10 mb-4" />,
              title: "Institute Insights",
              desc: "Get powerful analytics about student engagement, contributions, and progress.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-blue-50 p-8 rounded-2xl shadow hover:shadow-xl text-center transition"
            >
              <div className="flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact & Stats */}
      {
        /*
              <section className="py-20 bg-gradient-to-r from-blue-50 to-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-10"
        >
          The Impact We’re Creating
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              icon: <Users className="w-10 h-10 text-blue-600 mx-auto" />,
              count: "10K+",
              label: "Active Students",
            },
            {
              icon: (
                <GraduationCap className="w-10 h-10 text-yellow-500 mx-auto" />
              ),
              count: "50+",
              label: "Colleges Listed",
            },
            {
              icon: <Globe className="w-10 h-10 text-green-600 mx-auto" />,
              count: "10K+",
              label: "Study Materials Shared",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 hover:shadow-xl transition"
            >
              {item.icon}
              <h3 className="text-3xl font-bold text-blue-700 mt-4 mb-2">
                {item.count}
              </h3>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

        */
      }
      {/* CTA Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Be Part of India’s Smartest Student Network
        </motion.h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Upload materials, climb leaderboards, and make learning fun — join the
          SkillHub community today.
        </p>
        <Button
          asChild
          className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg"
        >
          <Link href="/auth">Join SkillHub</Link>
        </Button>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Building2, Lightbulb } from "lucide-react";
import {  Upload, Layers } from "lucide-react";
import Image from "next/image";

// Added "use client" directive so this file is treated as a client component.
// This ensures framer-motion (which requires client-side rendering) can be safely used.


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen  bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
         {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Empowering Every <span className="text-yellow-300">Student</span> to Learn, Share & Grow
          </h1>
          <p className="text-lg opacity-90 mb-8">
            SkillHub brings students, colleges, and resources together on one collaborative platform — where learning never stops.
          </p>
          <Button
            asChild
            className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-3 rounded-lg shadow-lg"
          >
            <Link href="/auth">Get Started</Link>
          </Button>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
            <Image
              src="/student-studying-online.png"
              alt="Learning Illustration"
              width={650}
              height={300}
              className="rounded-2xl drop-shadow-2xl"
            />
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          How SkillHub Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Building2 className="text-blue-600 w-10 h-10 mb-4" />,
              title: "Get Your College Space",
              desc: "Register yourself. Get your college space and access your learning hub.",
              color: "border-blue-600",
            },
            {
              icon: <Upload className="w-10 h-10 text-yellow-500 mx-auto mb-4" />,
              title: "Upload & Share",
              desc: "Upload assignments, notes, and previous year papers to help peers.",
              color: "border-yellow-400",
            },
            {
              icon: <Lightbulb className="text-green-500 w-10 h-10 mb-4" />,
              title: "Compete & Grow",
              desc: "Earn XP, climb leaderboards, and gain recognition district-wide.",
              color: "border-green-500",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-gray-50 rounded-xl shadow-lg p-8 border-t-4 ${step.color} hover:shadow-xl transition`}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-blue-50 to-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          Features You’ll Love
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
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
              desc: "Connect with peers and faculty from your college’s SkillHub community.",
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
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-t-4 border-blue-600"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          What Students Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
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
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-gray-50 rounded-xl shadow-lg p-8 border-t-4 ${t.color} hover:shadow-xl transition`}
            >
              <p className="text-gray-600 italic mb-4">“{t.text}”</p>
              <h4 className="text-blue-700 font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.college}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Start Your SkillHub Journey
        </motion.h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Upload materials, learn from peers, and rise on the leaderboard —
          build your academic community today.
        </p>
        <Button
          asChild
          className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg"
        >
          <Link href="/auth">Join Now</Link>
        </Button>
      </section>
    </div>
  );
}
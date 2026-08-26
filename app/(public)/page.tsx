"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { features, reviews, skillHubWork } from "./data";
import FAQPage from "./faq/FAQ";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen  bg-gradient-to-b from-blue-50 to-white">
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
            Empowering Every <span className="text-yellow-300">Student</span> to
            Learn, Share & Grow
          </h1>
          <p className="text-lg opacity-90 mb-8">
            SkillHub brings students, colleges, and resources together on one
            collaborative platform — where learning never stops.
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
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          How SkillHub Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {skillHubWork.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-gray-50 rounded-xl shadow-lg p-8 border-t-4 ${step.color} hover:shadow-xl transition`}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 md:px-20 bg-gradient-to-r from-blue-50 to-white text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          Features You&apos;ll Love
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, i) => (
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

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Start Your SkillHub Journey{" "}
          <span className="line-through text-xl">Later</span> <span className="text-blue-700">Now</span>
        </motion.h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Upload materials, learn from peers, and rise on the leaderboard
          &minus; build your academic community today.
        </p>
        <Button
          asChild
          className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg"
        >
          <Link href="/auth">Join Now</Link>
        </Button>
      </section>

      {/* Testimonials Section */}
      <section className="pb-20 px-6 md:px-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-gray-800 mb-12 underline underline-offset-8"
        >
          What Students Say?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((t, i) => (
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

      {/* FAQ Section */}
      <FAQPage />
    </div>
  );
}
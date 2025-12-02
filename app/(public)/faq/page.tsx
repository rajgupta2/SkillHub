"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is SkillHub?",
      a: "SkillHub is a digital platform that connects students and colleges through shared study materials, challenges, and performance tracking. Each college gets its own digital portal with access to resources and leaderboards.",
    },
    // {
    //   q: "How can I register my college?",
    //   a: "Colleges can register via the 'Register Your Institute' page on our website. Fill in the required details, and our team will contact you within 2–3 business days to set up your portal.",
    // },
    {
      q: "Is SkillHub free for students?",
      a: "Yes! SkillHub is completely free for students to join, upload materials, participate in challenges, and track their growth.",
    },
    {
      q: "How do I earn XP points?",
      a: "You earn XP by uploading verified study materials, completing challenges, and participating in events organized through SkillHub.",
    },
    {
      q: "How can institutes track student performance?",
      a: "Colleges get access to analytics dashboards that display engagement metrics, uploads, and leaderboard rankings for their students.",
    },
    {
      q: "Can I collaborate or partner with SkillHub?",
      a: "Yes! We welcome collaboration with institutions, educators, and organizations. Reach out to us through the Contact page.",
    },
  ];

  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* Header */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Help & FAQs
        </motion.h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Find answers to common questions and learn how to make the most of SkillHub.
        </p>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center mt-10 px-6">
        <div className="flex items-center bg-white shadow rounded-lg w-full md:w-1/2 p-3">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full outline-none text-gray-700"
          />
        </div>
      </div>

      {/* FAQ List */}
      <main className="flex-1 py-16 px-6 md:px-20">
        {filteredFaqs.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow p-6 border border-blue-100"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-600 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No FAQs found for &quot;{search}&quot;. Try a different keyword.
          </p>
        )}
      </main>

      {/* Help Contact Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <HelpCircle className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Our support team is here to help. Reach out anytime for assistance.
        </p>
        <Link href="/contact">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg flex items-center gap-2 mx-auto cursor-pointer">
            <Mail className="w-5 h-5" /> Contact Support
          </Button>
        </Link>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function SuggestionsPage() {
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend API
    try{
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestion`, {
        method: "POST",
        credentials:"include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setSubmitted(false);
      console.log(err.message || "Something went wrong");
    }
    setFormData({ title: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white pt-6 px-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className=" text-blue-700 text-xl">
          Got a New Idea or Feature Suggestion?
        </h1>
        <p className="text-gray-600">
          We&apos;d love to hear your thoughts! Share your ideas for new features or feedback.
        </p>
      </motion.div>

      {/* Suggestion Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-4 border border-blue-100"
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Your Title </span>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter the title"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">
            Your Suggestion / Idea
          </span>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full mt-2 p-3 h-40 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Share your thoughts here..."
            required
          />
        </label>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg text-lg font-semibold"
        >
          <Send className="w-5 h-5" /> Submit Suggestion
        </Button>

        {submitted && (
          <p className="mt-4 text-green-600 text-center font-medium">
            ✅ Thanks for your feedback! We’ll review your idea soon.
          </p>
        )}
      </motion.form>
    </div>
  );
}

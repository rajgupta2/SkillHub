"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: string; text: string } | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus({ type: "success", text: "Your message has been sent!" });
      setForm({ fullname: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", text: "Something went wrong. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Contact Info */}
      <section className="py-14 px-6 md:px-20 bg-gray-100 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions, feedback, or ideas? We’d love to hear from you. Join
            the SkillHub community and be a part of the movement to make college
            learning smarter.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto"
        >
          {/* Email */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600">
            <Mail className="text-blue-600 w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600">{process.env.NEXT_PUBLIC_EMAIL}</p>
          </div>

          {/* Join Community */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-yellow-400">
            <Users className="text-yellow-500 w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Join Our Community
            </h3>
            <p className="text-gray-600">
              Be part of our growing student network. Learn, share, and grow
              with SkillHub.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Button
            asChild
            className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-3 rounded-lg shadow-lg"
          >
            <Link href="/auth">Join SkillHub</Link>
          </Button>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="py-10 px-6 md:px-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Send Us a Message
          </motion.h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Fill out the form below, and our support team will get back to you
            within 24 hours.
          </p>

          {/* Status Message */}
          {status && (
            <p
              className={`mb-6 text-lg ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.text}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
          >
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Subject */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="What’s this about?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Type your message..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    {" "}
                    <Send className="w-5 h-5" /> Send Message{" "}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 md:px-20 bg-blue-50">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Find Us on the Map
        </h2>
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="SkillHub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83925796896!2d77.06889952186892!3d28.5275820074407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5b8a8a6e7b3%3A0x78dfd0b70e1768c6!2sNoida!5e0!3m2!1sen!2sin!4v1699419836902!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <h2 className="text-3xl font-bold mb-4">We’d Love to Collaborate</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Whether you're a college looking to join or a student with ideas —
          SkillHub is always open for collaboration.
        </p>
        <Link href="/auth">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg">
            Join SkillHub
          </Button>
        </Link>
      </section>
    </div>
  );
}

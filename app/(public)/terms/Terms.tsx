"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-center text-white">
        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Terms & Privacy Policy
        </motion.h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Please review our policies carefully to understand how SkillHub operates and protects your data.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-blue-100 leading-relaxed text-gray-700">
          {/* Terms of Service */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-blue-600" /> Terms of Service
            </h2>
            <p>
              By accessing or using SkillHub, you agree to comply with and be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the platform.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">1. Use of Platform</h3>
            <p>
              SkillHub provides digital spaces for students and colleges to share and access study materials.
              You agree not to misuse the platform by uploading harmful, copyrighted, or misleading content.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and activities
              under your account. SkillHub is not liable for losses caused by unauthorized access.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h3>
            <p>
              All content on SkillHub, except user-uploaded materials, is the property of SkillHub.
              Reproduction, redistribution, or commercial use without permission is prohibited.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">4. Termination</h3>
            <p>
              SkillHub reserves the right to suspend or terminate accounts that violate these terms or engage
              in activities that harm the community.
            </p>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-600" /> Privacy Policy
            </h2>
            <p>
              Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect
              your personal data while you use SkillHub.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">1. Data Collection</h3>
            <p>
              We collect personal details (name, email, college name) when you register. We also collect
              usage data such as uploaded files, leaderboard participation, and activity logs to improve
              platform features.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">2. Data Usage</h3>
            <p>
              The collected data helps us personalize your experience, provide college analytics, and
              display leaderboards. SkillHub does not sell your data to third parties.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h3>
            <p>
              SkillHub uses cookies to enhance functionality and improve user experience. You can
              disable cookies in your browser, but some features may not work properly.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">4. Data Protection</h3>
            <p>
              We use encryption, secure cloud storage, and restricted access policies to safeguard
              user information. In the event of a data breach, users will be notified promptly.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">5. Changes to Policy</h3>
            <p>
              SkillHub may update this policy periodically. Changes will be posted on this page
              with an updated “Last Modified” date.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">6. Contact</h3>
            <p>
              For questions about our policies, reach out at{" "}
              <a
                href="mailto:legal@skillhub.in"
                className="text-blue-600 hover:underline"
              >
                {process.env.NEXT_PUBLIC_EMAIL}
              </a>.
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-10 border-t pt-4">
            <p>
              Last Updated: <strong>November 2025</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

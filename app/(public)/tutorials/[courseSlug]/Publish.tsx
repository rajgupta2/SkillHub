"use client";

import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Plus,
  Layers,
} from "lucide-react";
import React from "react";
import { useCourse } from "./CourseContext";
import { generateCourseSlug } from "@/components/slugify";

export default function PublishPage() {
  const router = useRouter();
  const {course} = useCourse();
  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    setPublishing(true);
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;

    if (!token) {
        router.push(`/auth?redirect=/course/${course!.slug}`);
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${course!._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({status:"published"}),
    });

    if (res.status === 401) {
      router.push("/auth");
      return;
    }

    const data = await res.json();

    if (data.published) {
      alert("Course Published Successfully.");
      router.back();
    }else{
      alert("Something went wrong while publishing. Please try again.");
    }
    setPublishing(false);
  }

  return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-6">
          {/* Badge */}
          <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-medium">
            🚀 Ready to Publish
          </span>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Share Your Knowledge with the World
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You’ve created a course that can help others learn and grow.
            Publish it now so students can start learning — and you’ll
            soon start earning <span className="font-semibold text-indigo-600">points & recognition</span>.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border p-6 text-center shadow-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-lg">Help Others Learn</h3>
            <p className="text-sm text-gray-600 mt-2">
              Your tutorial becomes accessible to anyone who wants to learn this topic.
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center shadow-sm">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-semibold text-lg">Earn Points</h3>
            <p className="text-sm text-gray-600 mt-2">
              Publishing courses will soon reward you with points and achievements.
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center shadow-sm">
            <div className="text-3xl mb-3">✏️</div>
            <h3 className="font-semibold text-lg">Edit Anytime</h3>
            <p className="text-sm text-gray-600 mt-2">
              Don&apos;t worry — you can update and improve your course even after publishing.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold text-lg shadow-lg
             hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? "Publishing..." : "🚀 Publish Course"}
          </button>

          <button
            className="rounded-xl border px-8 py-4 font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => router.push(
            `/tutorials/${course?.slug}/${generateCourseSlug(course?.links[0].title || "")}`
            )}
          >
            Continue Editing
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-sm text-gray-500">
          By publishing, you make this course visible to learners.
          Points & creator rewards are coming soon ✨
        </p>
      </div>
  );
}

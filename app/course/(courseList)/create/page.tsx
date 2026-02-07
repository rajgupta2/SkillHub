"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, BookOpen } from "lucide-react";
import { saveLocalCourse } from "@/lib/course-idb";

export default function CreateCoursePage() {
  const router = useRouter();

  const [courseName, setCourseName] = useState("");
  const [courseDescription,setCourseDescription]=useState("");
  const [linksText, setLinksText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateCourse() {
    if (!courseName.trim() || !linksText.trim()){
      alert("Please enter course name and links.");
      return;
    }

    setLoading(true);

    const localCourseId = crypto.randomUUID();

    const links = linksText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((title,ind) => ({
        linkId: crypto.randomUUID(),
        title,
        order:ind
      }));

    await saveLocalCourse({
      localCourseId,
      title:courseName,
      slug:localCourseId,
      status: "draft",
      links,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    router.push(`/course/${localCourseId}`);
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] my-8">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Create a New Course
            </h1>
            <p className="text-sm text-gray-500">
              Start building structured learning content
            </p>
          </div>
        </div>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            placeholder="e.g. Web Development Bootcamp"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full rounded-lg border px-4 py-2
            focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Course Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description
          </label>
          <input
            type="text"
            placeholder="e.g. This course contains ..."
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full rounded-lg border px-4 py-2
            focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Links */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Sections (comma separated)
          </label>
          <textarea
            placeholder="Introduction, HTML Basics, CSS, JavaScript"
            value={linksText}
            onChange={(e) => setLinksText(e.target.value)}
            className="w-full min-h-[100px] rounded-lg border px-4 py-2
            focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            You can edit or add more sections later
          </p>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          onClick={handleCreateCourse}
          className={`w-full flex items-center justify-center gap-2
          px-4 py-3 rounded-xl font-medium text-white cursor-pointer
          transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </div>
  );
}

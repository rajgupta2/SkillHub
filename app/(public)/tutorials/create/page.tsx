"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, BookOpen } from "lucide-react";
import slugify from "slugify";
import { UICourse } from "@/lib/courseSchema";



export default function CreateCoursePage() {
  const router = useRouter();

  const [courseName, setCourseName] = useState("");
  const [courseDescription,setCourseDescription]=useState("");
  const [linksText, setLinksText] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveCourse(course:{title:string,description:string,links:any}) {
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    });

    const data = await res.json();

    if (data.published) {
      alert("Course Published Successfully.");
      router.back();
    }else{
      alert("Something went wrong while publishing. Please try again.");
    }
  }

  async function handleCreateCourse() {
    if (!courseName.trim() || !linksText.trim() || !courseDescription.trim()){
      alert("Please enter all details.");
      return;
    }

    setLoading(true);

    const links = linksText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((title,ind) => ({
        linkId: slugify(title),
        title,
        order:ind
    }));

    saveCourse({
      title:courseName,
      description:courseDescription,
      links
    });
    router.push(`/tutorials`);
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] my-8">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
      >
        {/* Header */}
          <p className=" text-blue-500 font-bold mb-2">
            Start building structured learning content
          </p>

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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [courseDescription,setCourseDescription]=useState("");
  const [loading, setLoading] = useState(false);

  async function saveCourse(title:string,description:string) {
    const tokenRes = await fetch("/api/find-token", {method: "GET"});
    const dataToken = await tokenRes.json();
    const token=dataToken.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description
      }),
    });

    const data = await res.json();
    if (data.created) {
      alert("Course created Successfully.");
    }else{
      alert("Something went wrong while creating. Please try again.");
    }
  }

  async function handleCreateCourse() {
    if (!courseName.trim() || !courseDescription.trim()){
      alert("Please enter all details.");
      return;
    }
    setLoading(true);
    await saveCourse(courseName,courseDescription);
    router.replace("/tutorials");
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

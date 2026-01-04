"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { mergeCourses, fetchLocalCourses, fetchServerCourses } from "@/lib/mergeCourses";
import { UICourse } from "@/lib/courseSchema";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<UICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [server, local] = await Promise.all([
        fetchServerCourses(),
        fetchLocalCourses(),
      ]);

      setCourses(mergeCourses(server, local));
      setLoading(false);
    }

    load();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 min-h-[70vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Your Courses
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and build your learning content
          </p>
        </div>

        <Link
          href="/course/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const statusMap = {
            server: {
              label: "Server",
              color: "bg-green-100 text-green-700",
            },
            "local-draft": {
              label: "Draft",
              color: "bg-yellow-100 text-yellow-700",
            },
            "local-edited": {
              label: "Edited Copy",
              color: "bg-blue-100 text-blue-700",
            },
          };

          const status = statusMap[course.source];
          const isServerCourse=course.source==="server";
          return (
            <div
              key={course.id}
              className="group bg-white rounded-2xl border border-gray-100
              shadow-sm hover:shadow-xl transition-all duration-300
              hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              {/* Card Body */}
              <div className="p-5 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {course.title}
                    </h2>
                  </div>
                </div>

                {/* Status Badge */}
                {status && (
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${status.color}`}
                  >
                    {status.label}
                  </span>
                )}

                {/* Meta */}
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-gray-600">
                    {course.links.length} lesson
                    {course.links.length !== 1 ? "s" : ""}
                  </p>

                  <p className="text-xs text-gray-400">
                    Last updated ·{" "}
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="border-t px-5 py-4">
                <Link
                  href={
                    !course.owner
                      ? `/course/${course.title.split(" ").join("-").toLowerCase()}?courseId=${course.id}`
                      : `/course/${course.title.split(" ").join("-").toLowerCase()}/${course.links[0].title.split(" ").join("-").toLowerCase()}?courseId=${course.id}&linkId=${course.links[0].linkId}&server=${isServerCourse}`
                  }
                  className="inline-flex items-center justify-center gap-2
                  w-full rounded-xl bg-blue-600 text-white
                  py-2.5 text-sm font-medium
                  hover:bg-blue-700 transition-colors"
                >
                  Open Course
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

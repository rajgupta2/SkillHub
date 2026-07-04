"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { UICourse } from "@/lib/courseSchema";
import { generateCourseSlug } from "@/components/slugify";

export default function CoursesPage({courses}:{courses:UICourse[]}) {

  return (
    <div className="max-w-7xl mx-auto py-6 min-h-[70vh] px-6 ">
      {/* Header */}
      <div className="flex items-end justify-end mb-4">
        <Link
          href="/tutorials/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Create Tutorial
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          courses.map((course,ind) => {

          return (
            <Link
              key={ind}
              href={
                course.status === "draft"
                  ? `/tutorials/${course.slug}`
                  : `/tutorials/${course.slug}/${generateCourseSlug(course.links[0].title)}`
              }
              className="group relative flex flex-col items-center justify-center
              rounded-2xl border border-blue-600
              shadow-xl shadow-blue-50 hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-5
              min-h-[220px]"
            >

              {/* Content */}
              <div className="px-6 text-center">
                <h2
                  className="text-xl font-semibold text-gray-900 leading-snug
                  line-clamp-2 transition-colors"
                >
                  {course.title}
                </h2>

                {course.status ==="draft" && (
                  <span
                    className={`absolute bottom-4 right-4
                      px-3 py-1 text-xs font-semibold rounded-full
                    bg-white/70 backdrop-blur`}
                  >
                    {course.status}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

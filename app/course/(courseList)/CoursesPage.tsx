"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { mergeCourses, fetchLocalCourses } from "@/lib/mergeCourses";
import { UICourse } from "@/lib/courseSchema";
import TutorialInfoModal from "./TutorialInfoModal";
import { generateCourseSlug } from "@/components/slugify";
export default function CoursesPage({server_Courses}:{server_Courses:UICourse[]}) {
  const router = useRouter();
  const [courses, setCourses] = useState<UICourse[]>(server_Courses);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    //Show modals once in a week.
      const LAST_SHOWN_KEY = "tutorial-info-last-shown";
      const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // ms

      const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
      if (!lastShown) {
        // Never shown before
        setShowInfoModal(true);
        return;
      }
      const lastShownTime = Number(lastShown);
      const now = Date.now();

      if (now - lastShownTime > ONE_WEEK) {
        setShowInfoModal(true);
      }
  }, []);

  function closeModal() {
    localStorage.setItem("tutorial-info-last-shown", Date.now().toString());
    setShowInfoModal(false);
  }


  useEffect(() => {
    async function load() {
      const server=server_Courses;
      const local=await fetchLocalCourses();
      setCourses(mergeCourses(server, local));
    }

    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 min-h-[70vh] px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Your Tutorials
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
          Create Tutorial
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course,ind) => {
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
            <Link
              key={ind}
              href={
                !course.owner
                  ? `/course/${course.slug}`
                  : `/course/${course.slug}/${generateCourseSlug(
                      course.links[0].title
                    )}`
              }
              className="group relative flex flex-col items-center justify-center
              rounded-2xl border border-gray-200
              bg-gradient-to-br from-blue-200 to-white
              shadow-sm hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
              min-h-[220px]"
            >

              {/* Content */}
              <div className="px-6 text-center">
                <h2
                  className="text-xl font-semibold text-gray-900 leading-snug
                  line-clamp-2 group-hover:text-blue-600 transition-colors"
                >
                  {course.title}
                </h2>

                {status && (
                  <span
                    className={`absolute bottom-4 right-4
                      px-3 py-1 text-xs font-semibold rounded-full
                    bg-white/70 backdrop-blur ${status.color}`}
                  >
                    {status.label}
                  </span>
                )}
              </div>
              {/* Hover Accent */}
              <div
                className="absolute inset-x-0 bottom-0 h-1
                bg-gradient-to-r from-blue-500 to-indigo-500
                opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>

          );
        })}
      </div>
      <TutorialInfoModal
        open={showInfoModal}
        onClose={closeModal}
      />
    </div>
  );
}

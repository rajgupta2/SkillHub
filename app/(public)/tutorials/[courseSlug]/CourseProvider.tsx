"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddSidebarItem } from "./AddSidebarItem";
import { CourseContext, useCourse } from "./CourseContext";
import { UICourse } from "@/types/types";

export default function CourseProvider({
  children,
  serverCourse
}: {
  children: React.ReactNode;
  serverCourse:UICourse;
}){
  const [course, setCourse] = useState<UICourse>(serverCourse);
  const router = useRouter();
  if (!course) {
    router.push("/tutorials");
  }

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      <CoursePage>
        {children}
      </CoursePage>
    </CourseContext.Provider>
  );
}

export function CoursePage({
  children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  const {course, setCourse} = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if(!course){
    return <p>Course does not found.</p>
  }
  const courseSlug=course.slug;
  const param:{courseSlug:string,linkSlug:string}=useParams();
  const linkSlug=param.linkSlug;

  async function updateCourse(cSlug:string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${cSlug}`);
    const course = await res.json();
    setCourse(course);
  }

  async function addLinkToCourse(linkName: string) {
    try{
      const tokenRes = await fetch("/api/find-token", { method: "GET" });
      const dataToken = await tokenRes.json();
      const token = dataToken.token;
      if (!token) return alert("Please login to make an update.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorial/${courseSlug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title:linkName, status:"draft" }),
        },
      );
      const data=await res.json();
      if(res.status===500) return alert(data.error);
      if(res.status===201) await updateCourse(courseSlug);
      return { created: res.status===201 };
    }catch(error){
      return {created:false,error};
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed  bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 z-20 w-screen md:w-80 h-screen overflow-auto bg-gradient-to-b
        from-blue-800 to-blue-600 transition-transform duration-300
          pt-4 border shadow rounded-r-2xl text-white
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex pl-4 border-b-2 justify-between pb-4 mb-2">
          <p>{course.title} Tutorials</p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden px-4 items-end justify-end"
          >
            <X className="w-6 h-6 pt-2" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col px-4">
          {course.links.map((link: any) => {
            const isActive = linkSlug === link.slug;
            return (
                <Link
                  key={link._id}
                  title={link.title}
                  href={`/tutorials/${course.slug}/${link.slug}`}
                  className={`px-3 py-2 rounded-lg transition truncate ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-600 hover:font-semibold"
                  }`}
                >
                  {link.title}
                </Link>
            );
          })}
          <AddSidebarItem
            set_Links={async (linkName) => {
              await addLinkToCourse(linkName);
            }}
          />
        </nav>
      </aside>

      <div className="flex-1">
        {/* Content Area */}
        <div className="flex flex-col min-h-screen max-w-screen">
          {/* Topbar */}
          <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
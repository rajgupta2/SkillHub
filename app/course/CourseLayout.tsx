"use client";

import { usePathname,useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Plus,
  Delete,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddSidebarItem } from "./AddSidebarItem";
import type {  PartialBlock } from "@blocknote/core";
import { getLocalCourseById, saveLocalCourse } from "@/lib/course-idb";
import { CourseDB} from "@/lib/db";
import { CourseContext, useCourse } from "./CourseContext";

export default function CoursePage({
  children,
  isLoggedIn
}: {
  children: React.ReactNode;
  isLoggedIn:boolean;
}){
  const [course, setCourse] = useState<CourseDB["courses"]["value"] | null>(null);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const courseSlug=segments[1];
  //localStorage.setItem("isLoggedIn",isLoggedIn?"true":"false");
  useEffect(() => {
    (async () => {
      const res=await fetchServerCoursesBySlug(courseSlug);
      let course;
      if(res.status===200) course=await res.json();
      const data=await getLocalCourseById(courseSlug);
      if(data && data.slug===course.slug) course=data;

      if(course) setCourse(course);
    })();
  }, []);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      <CourseLayout>
        {children}
      </CourseLayout>
    </CourseContext.Provider>
  );
}

export async function fetchServerCoursesBySlug(courseSlug:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/slug/${courseSlug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

export function CourseLayout({
  children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [loading, setLoading] = useState(true);
  const {course, setCourse} = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [links,setLinks]=useState(course?.links || []);
  const courseSlug=segments[1]; //act as courseId only for browser stored course.
  const linkSlug=segments.length===3 ? segments[2] : "";

  useEffect(()=>{
    setLinks(course?.links || []);
    setLoading(false);
  },[course])


  async function addLinkToCourse(linkName: string) {
    try{

      if (!course) {
        console.error("Course not found");
        return {created:false,error:"Course not found"};
      }

      const link={
        linkId: crypto.randomUUID(),
        title: linkName,
        order: course.links.length,
      }

      const updatedCourse = {
        ...course,
        links: [...links, link],
        status: course.status === "published" ? "edited" : course.status,
      };

      await saveLocalCourse(updatedCourse);
      setCourse(updatedCourse);
      return {created:true,link};
    }catch(error){
      return {created:false,error};
    }
  }

  async function deleteLinkFromCourse(linkId: string) {
  try{

    if (!course) {
      console.error("Course not found");
      return {deleted:false,error:"Course not found"};
    }

    // 2️⃣ Filter out the link to delete
    const updatedLinks = links.filter(
      (link: any) => link.linkId !== linkId
    );


    // 3️⃣ Re-order links (VERY IMPORTANT)
    const reorderedLinks = updatedLinks.map((link, index:number) => ({
      ...link,
      order: index,
    }));

    // 4️⃣ Update course
    const updatedCourse = {
      ...course,
      links: reorderedLinks,
      status: course.status === "published" ? "edited" : course.status,
    };
    // 5️⃣ Save back
    await saveLocalCourse(updatedCourse);
    setCourse(updatedCourse);
    return { deleted: true,link:reorderedLinks};
  } catch (error) {
      console.error("Delete failed:", error);
      return { deleted: false, error: "Something went wrong" };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen flex flex-col bg-gradient-to-b from-blue-800 to-blue-600 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-blue-600">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-yellow-400" />
            <span className="font-bold text-2xl text-white">SkillHub</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col overflow-y-auto gap-2 px-4 pt-6 py-16">
          {links.map((link) => {
            const isActive = linkSlug===link.title.split(" ").join("-").toLowerCase();
          return (
              <Link
                key={link.linkId}
                href={`/course/${course!.slug}/${link.title.split(" ").join("-").toLowerCase()}`}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-600 text-gray-100"
                }`}
              >
                {/* Left: Title */}
                <span className="truncate">{link.title}</span>

                {/* Right: Delete box */}
                <div
                  className="
                    ml-3
                    hidden
                    group-hover:flex
                    items-center
                    justify-center
                    w-8 h-8
                    rounded-md
                    bg-red-500/20
                    hover:bg-red-500
                    transition
                  "
                  onClick={async (e) => {
                    e.preventDefault(); // prevent navigation
                    e.stopPropagation();
                    await deleteLinkFromCourse(link.linkId);
                  }}
                >
                  <Delete className="w-4 h-4 text-red-500 hover:text-white" />
                </div>
              </Link>
            );
          })}
          <AddSidebarItem
            set_Links={async (linkName)=>{
             await addLinkToCourse(linkName);
            }}
          />
        </nav>


        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-blue-500 px-4 py-4 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} SkillHub
          <br /> Empowering Learners Together
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white border-b border-blue-100 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-blue-700 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
               {course?.title} Tutorial Zone
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-gray-700 font-medium">
              Hello, Reader
            </span>
            <Image
              src="/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500"
            />
          </div>
        </header>

        {
          (loading)
          ?
            <div className="flex items-center justify-center h-[60vh] text-gray-500">
              Loading course...
            </div>
          :
            <main className="flex-1 overflow-y-auto min-h-[82vh] py-6">
                  {children}
            </main>
        }

        {/* Page Footer */}
        <footer className="bg-white border-t mt-auto text-center py-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} SkillHub — Empowering Learners Together
        </footer>
      </div>
    </div>
  );
}
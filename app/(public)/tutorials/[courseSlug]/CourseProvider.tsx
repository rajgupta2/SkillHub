"use client";

import { notFound, usePathname,useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Plus,
  Delete,
  Edit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddSidebarItem } from "./AddSidebarItem";
import type {  PartialBlock } from "@blocknote/core";
import { CourseContext, useCourse } from "./CourseContext";
import { generateCourseSlug } from "@/components/slugify";
import { UICourse } from "@/lib/courseSchema";
import slugify from "slugify";
import { title } from "process";

export default function CourseProvider({
  children,
  isLoggedIn,
  serverCourse
}: {
  children: React.ReactNode;
  isLoggedIn:boolean;
  serverCourse:UICourse;
}){
  const [course, setCourse] = useState<UICourse>(serverCourse);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const courseSlug=segments[1];
  useEffect(() => {
    localStorage.setItem("isLoggedIn",isLoggedIn?"true":"false");
  }, [courseSlug]);

  const router=useRouter();
  if(!course){
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
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const {course, setCourse} = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [links,setLinks]=useState(course?.links || []);
  const courseSlug=segments[1];         //act as courseId only for browser stored course!.
  const linkSlug=segments.length===3 ? segments[2] : "";
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  useEffect(()=>{
    if(course) setLinks(course?.links || []);
    setIsLoggedIn(localStorage.getItem("isLoggedIn")==="true" ?true :false);
  },[course])

  const [isCourseOwner,setCourseOwner]=useState<boolean>(false);
  useEffect(()=>{
    async function isOwner(){
      if(isCourseOwner) return;
      const isLoggedIn=localStorage.getItem("isLoggedIn");
      if(isLoggedIn!== "true") return;

      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/iscourseowner/${course!.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourseOwner(data.isOwner);
    }
    isOwner();
  },[course]);

  async function updateCourse(updatedCourse:UICourse){
      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${course!._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({links:updatedCourse!.links}),
        }
      );
      if (!res.ok) {
          throw new Error("Failed to update course content");
      }
  }
  async function addLinkToCourse(linkName: string) {
    try{
      const link={
        linkId: generateCourseSlug(linkName),
        title: linkName,
        order: course!.links.length,
      }
      if (!course || !links) return;
      const updatedCourse = {
        ...course,
        links: [...links, link],
        status: course!.status
      };

      updateCourse(updatedCourse as UICourse);
      setCourse(updatedCourse as UICourse);
      return {created:true,link};
    }catch(error){
      return {created:false,error};
    }
  }

  async function deleteLinkFromCourse(linkId: string) {
  try{

    // 2️⃣ Remove out the link to delete
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
      status: course!.status
    };

    // 5️⃣ Save back
    updateCourse(updatedCourse as UICourse);
    setCourse(updatedCourse as UICourse);

    return { deleted: true,link:reorderedLinks};
  } catch (error) {
      console.error("Delete failed:", error);
      return { deleted: false, error: "Something went wrong" };
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed  bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-screen md:w-80 h-screen overflow-hidden bg-gradient-to-b
-        from-blue-800 to-blue-600 transition-transform duration-300
          pt-4 border shadow rounded-r-2xl text-white
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="pl-4 border-b-2 pb-4 mb-2">
          <span>
          {course?.title} Tutorials
          {/*close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden px-4 items-end justify-end"
          >
            <X className="w-6 h-6 pt-2" />
          </button>
          </span>
        </div>


        {/* Sidebar Links */}
        <nav className=" max-h-[90vh] overflow-y-auto overflow-x-auto px-4">
          {
            links.map((link:any) => {
            const isActive = linkSlug===generateCourseSlug(link.title);
            return (
              <div
                key={link.order}
                className={`group flex items-center justify-between rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 font-semibold"
                    : "hover:bg-blue-600 hover:font-semibold"
                }`}
              >
              <Link
                key={link.linkId}
                title={link.title}
                href={`/tutorials/${course!.slug}/${generateCourseSlug(link.title)}`}
                className={` px-3 py-2 rounded-lg transition truncate`}
              >
                {/* Left: Title */}
                {link.title}
              </Link>

            <div className="flex items-center justify-end gap-1">
              {/* Right: edit box */}
              {
                isCourseOwner &&
                <Link
                  href={`/tutorials/${courseSlug}/${generateCourseSlug(link.title)}?isEditable=true`}
                  className="
                    flex md:hidden
                    group-hover:flex
                    items-center
                    justify-between
                    w-8 h-8
                    transition
                  "
                >
                  <Edit className="w-4 h-4 text-white-500" />
                </Link>
              }

              {/* Right: Delete box */}
              {
                isCourseOwner &&
                <div
                  className="
                    flex md:hidden
                    group-hover:flex
                    items-center
                    justify-between
                    w-8 h-8
                    transition
                  "
                  onClick={async (e) => {
                    e.preventDefault(); // prevent navigation
                    e.stopPropagation();
                    const wantToDelete=confirm(`Are You want to delete the page of ${link?.title}`);
                    wantToDelete && (await deleteLinkFromCourse(link.linkId));
                  }}
                >
                  <Delete className="w-5 h-5 text-white-500" />
                </div>
              }
              </div>
              </div>
            );
          })}
          {
            isCourseOwner&& <AddSidebarItem
              set_Links={async (linkName)=>{
              await addLinkToCourse(linkName);
            }}
          />
          }

        </nav>
      </aside>

      <div className="flex-1">
       {/* Content Area */}
      <div className="flex flex-col min-h-screen max-w-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b px-6 py-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-6">
          {children}
        </main>
      </div>
      </div>
    </div>
  );
}
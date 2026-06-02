"use client";

import { UICourse } from "@/lib/courseSchema";
import { createContext, useContext } from "react";

export type CourseContextType = {
  course: UICourse | null;
  setCourse: React.Dispatch<
    React.SetStateAction<UICourse>
  >;
};

export const CourseContext = createContext<CourseContextType | null>(null);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used inside CourseProvider");
  }
  return context;
};
"use client";

import { createContext, useContext } from "react";
import { CourseDB} from "@/lib/db";

export type CourseContextType = {
  course: CourseDB["courses"]["value"] | null;
  setCourse: React.Dispatch<
    React.SetStateAction<CourseDB["courses"]["value"] | null>
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
"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Delete,
  Edit,
  Pencil,
  Save,
  Trash,
} from "lucide-react";
import './styles.scss'
import React, { useEffect, useState } from "react";
import type { PartialBlock } from "@blocknote/core";
import { useCourse } from "../CourseContext";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Tutorial as TutorialTypes } from "@/types/types";
import { useRouter } from "next/navigation";
const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function Tutorial({
  t,
  statusCode,
  isTutorialOwner,
}: {
  t: TutorialTypes;
  statusCode: number;
  isTutorialOwner: Boolean;
}) {
  const { course, setCourse } = useCourse();
  const linkSlug = t.slug;
  const [content, setContent] = useState<PartialBlock[]>(
    t.content ?? [{ type: "heading", content: ["Start Typing..."] }],
  );
  const nextTutorial = course?.links.find((val) => val.order > t.order);
  const [editorKey, setEditorKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  async function updateTutorial() {
    const tokenRes = await fetch("/api/find-token", { method: "GET" });
    const dataToken = await tokenRes.json();
    const token = dataToken.token;
    if (!token) return alert("Please login to make an update.");
    else if (!isTutorialOwner)
      return alert("You are unauthorized to make an update.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutorial/${t.courseSlug}/${t.slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      },
    );
    if(res.status===200) console.log("Tutorial updated successfully.");
    if(res.status===500) alert("Failed to update tutorial.");
  }

  async function deleteTutorial() {
    try {
      const toDelete:boolean=confirm("Are you sure to delete the tutorial?. You can't access it later.");
      if(toDelete===false) return;

      const tokenRes = await fetch("/api/find-token", { method: "GET" });
      const dataToken = await tokenRes.json();
      const token = dataToken.token;
      if (!token) return alert("Please login to delete.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorial/${t.courseSlug}/${t.slug}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data=await res.json();
      if(res.status===500) throw new Error(data.error);

      return router.replace(`/tutorials/${t.courseSlug}`);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  useEffect(() => {
    let link = course?.links.find((l: any) => l.slug === linkSlug);
    if (link?.content) {
      setContent(link.content);
      setEditorKey((k) => k + 1);
    }
  }, [course]);

  if (statusCode === 401) {
    return (
      <div className="flex items-center justify-center min-h-[85vh] text-gray-700">
        You are unauthorized to access the content;
      </div>
    );
  }

  return (
    <div className=" mx-auto px-6">
      <div className="flex justify-end gap-4 mb-4 px-12">
        {isTutorialOwner && isEditing === false && (
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            title="Edit"
          >
            <Edit /> Edit
          </Button>
        )}

        {isTutorialOwner && isEditing === true && (
          <Button
            onClick={() => {
              updateTutorial();
              setIsEditing(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            title="Save"
          >
            <Save /> Save
          </Button>
        )}

        <Button
          onClick={() => {
            deleteTutorial();
          }}
          className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          title="Delete"
        >
          <Trash />
        </Button>

      </div>

      <Editor
        key={editorKey}
        initialContent={content}
        isEditable={isEditing}
        setContent={(content) => setContent(content)}
      />

      {nextTutorial && (
        <div className={`flex justify-end ${isEditing && "mt-4"}`}>
          <Link
            href={`/tutorials/${t.slug}/${nextTutorial.slug}`}
            className="
            group inline-flex items-center gap-2 mx-6
            rounded-lg px-4 py-2
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white
            shadow-md hover:shadow-lg
            transition-all duration-300
            hover:from-blue-700 hover:to-indigo-700
          "
          >
            Next Lesson
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

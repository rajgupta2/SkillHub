"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResourcesPage } from "@/components/ResourcesPage";
import { useEffect, useState } from "react";
import { Head } from "next/document";

interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  description: string;
  uploadedBy: {
    name: string;
  };
  createdAt: string;
  files: {
    id:number,
    originalName:string,
    url: string,
    contentType:string
    materialId: number;
   }[];
  studentId: string;
  collegeId: number | null;
}

export default function MaterialPage(){
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch materials from backend
    useEffect(() => {
      const fetchMaterials = async () => {
        try {
          const tokenRes = await fetch("/api/find-token", {method: "GET"});
          const dataToken = await tokenRes.json();
          const token=dataToken.token;
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/material?limit=150`, {
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Failed to fetch materials");

          const data = await res.json();
          setMaterials(data.materials || []);
        } catch (err) {
          console.error("Error fetching materials:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchMaterials();
    }, []);

  return (
  <>
    <ResourcesPage
      title="All Study Resources"
      materials={materials}
      loading={loading}
      homePage={true}
    />
    <section className="text-center bg-blue-600 text-white py-32 mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Have study materials to share?
        </h2>
        <p className="opacity-90 mb-6">
          Help others learn by uploading your assignments, PYQs, or notes.
        </p>
        <Link href="/student/contribute">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg">
            Upload Material
          </Button>
        </Link>
      </section>
    </>
  )
}

"use client";

import { Upload} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResourcesPage } from "@/components/ResourcesPage";

export default function MaterialPage(){
  return (
  <>
    <ResourcesPage
      url={`${process.env.NEXT_PUBLIC_API_URL}/public/get-materials?limit=150`}
      homePage={true}
      title="All Study Resources"
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

"use client";

import { Users } from "lucide-react";
import { useState, useEffect } from "react";
import { ResourcesPage } from "@/components/ResourcesPage";
import { Material } from "./page";

interface Peers {
  name: string;
  profile: { course: { name: string };
  startYear: number;
  endYear: number
  }
}

export default function Resources({materials}:{materials:Material[]}){
  return (
    <>
      <ResourcesPage
          materials={materials}
          title="My College Resources"
        />
      <FetchPeers/>
    </>
  )
}

export const FetchPeers=()=>{
  const [peers, setPeers] = useState<Peers[]>([]);
  // Fetch peers
  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/college-peers`, {
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch peers");
        const data = await res.json();
        setPeers(data.peers || []);
      } catch (err) {
        console.error("Error fetching peers:", err);
      }
    };

    fetchPeers();
  }, []);
  return (
      <div className="mt-8 mb-6 px-4 md:px-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" /> College Peers
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Course</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Year</th>
              </tr>
            </thead>
            <tbody>
              {peers.map((peer,id) => (
                <tr
                  key={id}
                  className={`border-b hover:bg-gray-50 ${
                    peer.name.includes("(You)") ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="px-6 py-3 text-gray-700 font-medium">{peer.name}</td>
                  <td className="px-6 py-3 text-gray-600">{peer.profile?.course?.name}</td>
                  <td className="px-6 py-3 text-gray-600">{peer.profile?.startYear}-{peer.profile?.endYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

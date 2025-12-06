"use client";

import { useState,useEffect } from "react";

interface DashboardStats {
  name: string,
  email: string,
  role: string,
  rank: number;
  materials_count: number;
  xpPoints: number;
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard-stats`, {
          credentials:"include",
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

    if (!stats) return <p>Loading stats...</p>;
    return (
    <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-600">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">My Rank</h3>
        <p className="text-3xl font-bold text-blue-700">#{stats.rank}</p>
        <p className="text-sm text-gray-500 mt-1">In District Leaderboard</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border-t-4 border-green-600">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Materials Uploaded</h3>
        <p className="text-3xl font-bold text-green-700">{stats.materials_count}</p>
        <p className="text-sm text-gray-500 mt-1">Total Contributions</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-500">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">XP Points</h3>
        <p className="text-3xl font-bold text-yellow-600">{stats.xpPoints}</p>
        <p className="text-sm text-gray-500 mt-1">Keep engaging to level up</p>
      </div>

      <div className="col-span-full bg-white rounded-xl shadow p-6 mt-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Recent Activity</h2>
        <ul className="space-y-3 text-gray-600">
          <li> Soon.... this section will come, designing & working on it. </li>
        {
          /*
          <li>📘 Uploaded Assignment on Cloud Computing</li>
          <li>🏆 Achieved Rank #12 in District Leaderboard</li>
          <li>📁 Shared PYQ for Data Structures</li>
          <li>💬 Commented on JavaScript Study Material</li>
          */
        }
        </ul>
      </div>
    </main>
  );
}

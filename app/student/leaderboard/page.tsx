"use client";

import { Trophy, Medal, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function LeaderboardPage() {
  const [tab, setTab] = useState("college");
  const [leaderboardData, setLeaderboardData] = useState<any>({
    college: [],
    district: [],
    zonal: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/leaderboard`, {
          credentials:"include"
        });
        const data = await res.json();
        console.log(data);
        setLeaderboardData({
          college: data?.leaderboardData?.college || [],
          district: data?.leaderboardData?.district || [],
          zonal: data?.leaderboardData?.zonal || [],
        });

      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <section className="p-6 min-h-screen flex justify-center items-center text-gray-600">
        Loading leaderboard...
      </section>
    );
  }

  const activeData = leaderboardData[tab] || [];

  return (
    <>
    <section className="p-6 min-h-[80vh] bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" /> Leaderboard
        </h1>

        {/* Tabs */}
        <div className="flex bg-white shadow rounded-lg overflow-hidden">
          <button
            onClick={() => setTab("college")}
            className={`px-6 py-2 font-medium transition ${
              tab === "college"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            College
          </button>
          <button
            onClick={() => setTab("district")}
            className={`px-6 py-2 font-medium transition ${
              tab === "district"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            District
          </button>
          <button
            onClick={() => setTab("zonal")}
            className={`px-6 py-2 font-medium transition ${
              tab === "zonal"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Zonal
          </button>
        </div>
      </div>

      {activeData.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 md:p-48">
            Please enter your college details to view leaderboard results.
        </p>
      ) : (
        <>
          {/* Top 3 Winners */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {activeData.slice(0, 3).map((user: any) => (
              <div
                key={user.rank}
                className={`bg-white p-6 rounded-xl shadow-md text-center border-t-4 ${
                  user.rank === 1
                    ? "border-yellow-400"
                    : user.rank === 2
                    ? "border-gray-400"
                    : "border-orange-400"
                }`}
              >
                <div className="flex justify-center mb-3">
                  {user.rank === 1 && <Trophy className="w-8 h-8 text-yellow-400" />}
                  {user.rank === 2 && <Medal className="w-8 h-8 text-gray-400" />}
                  {user.rank === 3 && <Star className="w-8 h-8 text-orange-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.college}</p>
                <p className="mt-2 text-blue-700 font-bold">{user.xp} XP</p>
                <p className="text-gray-500 text-sm">Rank #{user.rank}</p>
              </div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="bg-white rounded-xl shadow overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Rank</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">College</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">XP</th>
                </tr>
              </thead>
              <tbody>
                {activeData.map((user: any) => (
                  <tr
                    key={user.rank}
                    className={`border-b ${
                      user.name.includes("(You)") ? "bg-yellow-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm font-medium text-gray-800">
                      #{user.rank}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{user.college}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-blue-600">
                      {user.xp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </>
      )}
    </section>

      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Keep Learning. Keep Climbing. 🚀</h2>
        <p className="text-lg opacity-90 mb-6">
          Participate in coding challenges, contribute resources, and move up the leaderboard!
        </p>
        <Link href="/student/contribute">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-lg shadow-lg">
            Explore Challenges
          </Button>
        </Link>
      </section>
    </>
  );
}

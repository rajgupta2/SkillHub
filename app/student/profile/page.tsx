"use client";

import { useEffect, useState } from "react";
import {
  User,
  BookOpen,
  Trophy,
  Award,
  Edit3,
  Save,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Define types from your backend response
interface UserProfile {
  name: string,
  email: string,
  role: string,
  xpPoints: number,
  college_id:string|null,
  college: string|null,
  college_city: string|null,
  college_district: string|null,
  college_state: string|null,
  course_id: string | null,
  course: string|null,
  startYear: number | null,
  endYear: number | null,
  materials_count: number,
  rank:number
}

// ✅ Profile page component
export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch profile from backend using token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenRes = await fetch("/api/find-token", {method: "GET"});
        const dataToken = await tokenRes.json();
        const token=dataToken.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data: UserProfile = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isEditing]);

  // ✅ Handle field edits
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      const tokenRes = await fetch("/api/find-token", {method: "GET"});
      const dataToken = await tokenRes.json();
      const token=dataToken.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials:"include",
        body: JSON.stringify({
          profile
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Profile update failed.");
    }
  };

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading profile...</p>;
  if (error)
    return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  if (!profile) return null;

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" /> My Profile
        </h1>

        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-2 ${
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Course</label>
          <input
            type="text"
            name="course"
            value={profile.course ?? ""}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="Course Name"
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Course Start Year</label>
          <input
            type="number"
            name="startYear"
            value={profile.startYear ?? ""}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="20XX"
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Course End Year</label>
          <input
            type="number"
            name="endYear"
            value={profile.endYear ?? ""}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="20XX"
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">College</label>
          <input
            type="text"
            name="college"
            value={profile.college ?? ""}
            placeholder="College Name"
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">College&apos;s City</label>
          <input
            type="text"
            name="college_city"
            value={profile.college_city?? ""}
            placeholder="College City"
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">College&apos;s District</label>
          <input
            type="text"
            name="college_district"
            value={profile.college_district ?? ""}
            placeholder="College District"
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">College&apos;s State</label>
          <input
            type="text"
            name="college_state"
            value={profile.college_state ?? ""}
            placeholder="College State"
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
        />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border-t-4 border-blue-600 rounded-xl shadow p-6 text-center">
          <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">XP Points</h3>
          <p className="text-2xl font-bold text-blue-700">{profile.xpPoints}</p>
        </div>

        <div className="bg-white border-t-4 border-green-600 rounded-xl shadow p-6 text-center">
          <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">Materials Uploaded</h3>
          <p className="text-2xl font-bold text-green-700">
            {profile.materials_count}
          </p>
        </div>

        <div className="bg-white border-t-4 border-yellow-500 rounded-xl shadow p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">Rank</h3>
          <p className="text-2xl font-bold text-yellow-600">#{profile.rank}</p>
        </div>
      </div>
    </section>
  );
}

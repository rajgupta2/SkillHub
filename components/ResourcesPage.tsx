"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Download, Filter, Search, Building2, Users, Share2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formateDate } from "@/lib/formateDate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateLinkSlug } from "@/lib/slugify";
import { College, Material } from "@/types/types";

export function ResourcesPage({materials}:{materials:Material[]}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filterTypes = ["All", "Notes", "Assignment", "Project", "PYQ"];
  const [colleges, setColleges] = useState<Array<College>>([]);
  const [collegeId, setCollegeId] = useState<Number>(0);

    // Filter + Search logic
  const filteredResources = materials.filter((r) => {
    const matchesFilter = filter === "All" || r.type === filter;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.uploadedBy.name.toLowerCase().includes(search.toLowerCase());
    const matchCollege =
      (collegeId===0) ||  //No College Selected.
      (r.uploadedBy.profile?.college && r.uploadedBy.profile.college.id === collegeId) ||
      (!r.uploadedBy.profile?.college && collegeId===-1); //collegeId=-1 set by developer for others resource whose college is missing.
    return matchesFilter && matchesSearch && matchCollege;
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges`).then(async (res)=>{
      if(res.status===200)  setColleges(await res.json());
    });
  }, []);
  const pathname=usePathname();
  const isStudentCollegePage: boolean = pathname === "/student/college";
  return (
    <div className="pt-8 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="grid md:grid-cols-3 items-center justify-center gap-3 px-4 md:px-10">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-3 justify-center">
          {filterTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setFilter(type)}
              className={`${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } px-6 py-2 rounded-full transition`}
            >
              {type}
            </Button>
          ))}
        </div>
        <div>
          {
          !isStudentCollegePage && (
          <select
            name="collegeId"
            onChange={(e) => {
              setCollegeId(Number(e.target.value));
            }}
            className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none"
          >
            <option value="0">Filter By College</option>
            {colleges.map((c) => (
              <option
                key={c.id}
                value={c.id}
                title={`${c.name}, ${c.city}, ${c.district}, ${c.state}`}
              >
                {`${c.name}, ${c.city}, ${c.district}, ${c.state}`}
              </option>
            ))}
            <option value="-1">Other</option>
          </select>
          )}
        </div>
        {/* Search Container */}
        <div>
          <div className="w-full flex items-center border border-gray-500 rounded-lg">
            <Search className="text-gray-400 w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Search by title, subject, or uploader..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Materials Section */}
      <main
        className={`px-8 md:px-16 py-10 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100`}
      >
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No resources found. Try searching something else.</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}
          >
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className=" flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-blue-100"
              >
                <div className="flex items-center justify-between">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      resource.type === "Notes"
                        ? "bg-green-100 text-green-700"
                        : resource.type === "Assignment"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mt-4 text-gray-800">
                  {resource.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{resource.subject}</p>
                <p className="text-gray-600 text-sm mt-3">
                  Uploaded by{" "}
                  <span className="font-medium">
                    {resource.uploadedBy.name}
                  </span>
                </p>
                <span className="flex text-gray-400 text-xs mt-1">
                  <Calendar className="w-4 h-4 mr-2" />{" "}
                  {formateDate(resource.createdAt)}
                </span>
                <div className="flex justify-end mt-auto">
                  <Link
                    href={`/resources/${generateLinkSlug(resource.title)}/${resource.id}`}
                  >
                    <Button className=" bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
                      <Eye className="w-4 h-4" /> View
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

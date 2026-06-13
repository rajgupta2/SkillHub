import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ContributePopup = ({
    isOpen,
    setIsOpen
}:{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) => {

  const router=useRouter();

  const handleContribute = () => {
    router.push("/student/contribute");
  };

  if (!isOpen) return null;

  return (
    <div
        className={`fixed top-16 md:top-0 left-0 right-0 bottom-0 z-150 ${
            isOpen ? "flex" : "hidden"
        } justify-center overflow-y-auto bg-black/60 p-4 `}
    >
    <div className="w-full max-w-xl my-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 text-center">
          <div className="mb-3 text-4xl">&#x1F91D;</div>

          <h2 className="text-2xl font-bold text-gray-900">
            Help the Next Student
          </h2>
        </div>

        <p className="mb-4 text-gray-600">
          You've benefited from resources shared by other students and
          professionals.
        </p>

        <p className="mb-4 text-gray-600">
          If you have <b>notes, PYQs, interview experiences, projects,
          assignments, cheat sheets, or useful resources </b>, consider
          contributing just one resource to the community.
        </p>

        <p className="mb-6 font-medium text-gray-800">
          Your contribution could help someone prepare for an exam,
          learn a new skill, interview or land their first job.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={handleContribute}
            className=" cursor-pointer flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Contribute a Resource
          </Button>

          <Button
            onClick={()=>{setIsOpen(false);}}
            className=" cursor-pointer flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold transition"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContributePopup;
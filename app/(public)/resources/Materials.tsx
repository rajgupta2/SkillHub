"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResourcesPage } from "@/components/ResourcesPage";
import { Material } from "./page";
import ContributePopup from "./Alert";
import { useState,useEffect } from "react";

export default function MaterialPage({materials}:{materials:Material[]}){
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const storedTime = localStorage.getItem("contributionSet");
    const now = new Date();

    if (!storedTime) {
      // First time
      localStorage.setItem("contributionSet", now.toISOString());
      setIsOpen(true);
      return;
    }

    const previousTime = new Date(storedTime);
    const difference = now.getTime() - previousTime.getTime();

    // 1 hours = 1 * 60 * 60 * 1000 milliseconds
    if (difference >= 1 * 60 * 60 * 1000) {
      localStorage.setItem("contributionSet", now.toISOString());
      setIsOpen(true);
    }
  }, []);
  return (
  <>
    <ContributePopup isOpen={isOpen} setIsOpen={setIsOpen}/>
    <ResourcesPage  materials={materials} />
  </>
  )
}

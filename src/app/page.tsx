"use client";

import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
import SlidingImages from "@/components/slidingImages/slidingImages";
import Contact from "@/components/contact/contact";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import Preloader from "@/components/preloader/preloader";
import { UsePreloaderState } from "@/components/provider/preloaderContextProvider";
export default function Home() {
  const { showPreloader, setShowPreloader } = UsePreloaderState();
  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      // Set the flag to false after showing the preloader for the first time
      sessionStorage.setItem("isFirstVisit", "false");

      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowPreloader(false);
    }
  }, [setShowPreloader]);
  return (
    <main className="overflow-hidden">
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <SlidingImages />
      <Contact />
    </main>
  );
}

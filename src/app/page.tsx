"use client";

import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
import SlidingImages from "@/components/slidingImages/slidingImages";
import Contact from "@/components/contact/contact";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Preloader from "@/components/preloader/preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if we've visited before
    const hasVisited = window.sessionStorage.getItem("hasVisitedHome");

    if (!hasVisited) {
      // First visit - show preloader
      window.sessionStorage.setItem("hasVisitedHome", "true");
      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Subsequent visits - skip preloader
      setIsLoading(false);
      document.body.style.cursor = "default";
    }
  }, []);

  // Don't render anything until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <main className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <SlidingImages />
      <Contact />
    </main>
  );
}

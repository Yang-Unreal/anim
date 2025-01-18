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
import { useRefreshDetection } from "@/lib/hooks/useRefreshDetection";
import { useTransitionState } from "@/lib/hooks/useTransitionState";

export default function Home() {
  const [isRefreshed, setIsRefreshed] = useRefreshDetection();

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }

    // Handle loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstVisit(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowPreloader = isLoading && (isRefreshed || isFirstVisit);
  return (
    <main className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isFirstVisit ? <Preloader /> : null}
      </AnimatePresence>
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <SlidingImages />
      <Contact />
    </main>
  );
}

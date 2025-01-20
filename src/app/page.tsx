"use client";

import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
import SlidingImages from "@/components/slidingImages/slidingImages";
import Contact from "@/components/contact/contact";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import Preloader from "@/components/preloader/preloader";
import { usePathname } from "next/navigation";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(false);
  const pathname = usePathname();
  const isInitialRender = useRef(true); // Ref to track initial render

  useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem(
      "hasVisitedThisSession"
    );

    if (!hasVisitedThisSession) {
      setShowPreloader(true);
      sessionStorage.setItem("hasVisitedThisSession", "true");

      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setShowPreloader(false);
  }, [pathname]);

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

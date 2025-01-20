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
// import { usePathname } from "next/navigation";
import { UsePreloaderState } from "@/components/provider/preloaderContextProvider";

export default function Home() {
  const { showPreloader, setShowPreloader } = UsePreloaderState();
  // const pathname = usePathname();
  // const isInitialRender = useRef(true); // Ref to track initial render

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

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

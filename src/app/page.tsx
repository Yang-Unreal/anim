"use client";

import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
import SlidingImages from "@/components/slidingImages/slidingImages";
import Contact from "@/components/contact/contact";
import { UsePreloaderState } from "@/components/provider/preloaderContextProvider";
export default function Home() {
  const { showPage } = UsePreloaderState();
  return (
    <main className={`overflow-hidden ${!showPage ? "hidden" : ""}`}>
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <SlidingImages />
      <Contact />
    </main>
  );
}

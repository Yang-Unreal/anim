import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
import SlidingImages from "@/components/slidingImages/slidingImages";
import Contact from "@/components/contact/contact";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <SlidingImages />
      <Contact />
    </main>
  );
}

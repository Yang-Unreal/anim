import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
import Landing from "@/components/landing/landing";
import Description from "@/components/description/description";
export default function Home() {
  return (
    <>
      <Landing />
      <Description />
      <ProjectGallery initialProjects={projects} />
      <div className="w-screen h-screen bg-[#D3FD50]" />
    </>
  );
}

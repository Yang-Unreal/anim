import ProjectGallery from "@/components/project/projectGallery";
import { projects } from "@/lib/constants/projects";
// import Image from "next/image";
import InfiniteText from "@/components/infiniteText/infiniteText";

export default function Home() {
  return (
    <>
      <main className="h-screen flex items-center flex-col gap-3">
        <h1 className="text-4xl font-bold">Home</h1>

        <InfiniteText />
      </main>
      <ProjectGallery initialProjects={projects} />
    </>
  );
}

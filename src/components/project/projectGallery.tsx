"use client";
import { memo, useState, useCallback } from "react";
import Project from "./project";
import Modal from "@/components/modal/modal";
import type { ProjectGalleryProps } from "@/lib/type";

const ProjectMemo = memo(Project);

function ProjectGallery({ initialProjects }: ProjectGalleryProps) {
  const [modal, setModal] = useState({ active: false, index: 0 });

  const handleModalChange = useCallback((active: boolean, index: number) => {
    setModal({ active, index });
  }, []);

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-[1000px] flex flex-col items-center justify-center">
        {initialProjects.map((project, index) => (
          <ProjectMemo
            key={project.title}
            index={index}
            title={project.title}
            onModalChange={handleModalChange}
          />
        ))}
      </div>
      <Modal modal={modal} projects={initialProjects} />
    </section>
  );
}

export default ProjectGallery;

import { memo } from "react";

interface ProjectProps {
  index: number;
  title: string;
  onModalChange: (active: boolean, index: number) => void;
}

const Project = memo(({ index, title, onModalChange }: ProjectProps) => {
  return (
    <div
      onMouseEnter={() => onModalChange(true, index)}
      onMouseLeave={() => onModalChange(false, index)}
      className="group w-full flex justify-between items-center px-[100px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 last:border-b hover:opacity-50"
    >
      <h2 className="text-6xl m-0 font-normal transition-all duration-400 group-hover:translate-x-[-10px]">
        {title}
      </h2>
      <p className="font-light transition-all duration-400 group-hover:translate-x-[10px]">
        Design & Development
      </p>
    </div>
  );
});

Project.displayName = "Project";

export default Project;

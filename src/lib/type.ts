export interface Routes {
  "/": string;
  "/about": string;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

export interface TransitionTextProps {
  textRef: React.RefObject<HTMLParagraphElement>;
}
export interface TransitionPathProps {
  svgRef: React.RefObject<SVGSVGElement>;
  pathRef: React.RefObject<SVGPathElement>;
}

export interface PathsOutput {
  initial: string;
  leave: string;
  enter: string;
}

export interface CurveTransitionProps {
  children: React.ReactNode;
}

export interface Project {
  title: string;
  src: string;
  color: string;
}

export interface ProjectGalleryProps {
  initialProjects: Project[];
}

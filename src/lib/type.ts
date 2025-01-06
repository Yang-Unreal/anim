export interface TransitionRoutes {
  "/": string;
  "/about": string;
  "/work": string;
  "/contact": string;
}

export type NavItem = {
  title: string;
  href: Routes;
};

export type Routes = "/" | "/about" | "/work" | "/contact";

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

export interface ChildProps {
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

export interface CustomLinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

export interface NavContentProps {
  selectedIndicator: string;
  setSelectedIndicator: (href: string) => void;
  pathname: string;
}

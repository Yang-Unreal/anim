import { ReactNode } from "react";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UrlObject } from "url";
import { LinkProps } from "next/link";

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

//Transition types
export type Stage = "leaving" | "entering" | "none";

export type TransitionCallback = (
  next: () => void,
  from?: string,
  to?: string
) => Promise<(() => void) | void> | ((() => void) | void);

export interface TransitionRouterProps {
  children: ReactNode;
  leave?: TransitionCallback;
  enter?: TransitionCallback;
  auto?: boolean;
}
export type NavigateProps = (
  href: string,
  pathname: string,
  method?: "push" | "replace" | "back",
  options?: NavigateOptions
) => void;
export interface TransitionRouterContextType {
  stage: Stage;
  navigate: NavigateProps;
  isReady: boolean;
}

export type Url = string | UrlObject;

export interface TransitionLinkProps extends Omit<LinkProps, "href"> {
  href: Url;
  as?: Url;
  replace?: boolean;
  scroll?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
  className?: string;
}

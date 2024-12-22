"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react"; // Ensure you have motion installed
import { Debug } from "./components/debug";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Routes = {
  "/": string;
  "/about": string;
};
export default function CurveTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const routes: Routes = {
    "/": "Home",
    "/about": "About",
  };

  // const wrapperRef = useRef<HTMLDivElement>(null!);
  const svgRef = useRef<SVGSVGElement>(null!);
  // Function to generate and assign refs
  const pathRef = useRef<SVGPathElement>(null!);
  const paraRef = useRef<HTMLParagraphElement>(null!);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = windowDimensions;
  const initialPath = `
    M0 300 
    Q${width / 2} 300 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;
  const leaveTargetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;
  const enterTargetPath = `
  M0 300
  Q${width / 2} 0 ${width} 300
  L${width} ${height + 300}
  Q${width / 2} ${height + 300} 0 ${height + 300}
  L0 0
`;
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial resize call to set dimensions on component mount
    handleResize();

    // Add event listener on resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const pathname = usePathname();
  console.log(pathname);
  const SVG = () => {
    return (
      <svg
        ref={svgRef}
        className="fixed w-screen h-[calc(100dvh+600px)] left-0 top-[-300px] pointer-events-none invisible "
      >
        <path ref={pathRef} />
      </svg>
    );
  };

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        // animate(
        //   wrapperRef.current,
        //   { opacity: [1, 0], scale: 0.9 },
        //   {
        //     duration: 0.5,
        //   }
        // );
        animate(
          svgRef.current,
          { y: ["100vh", 0], visibility: ["visible"] },
          {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }
        );
        animate(
          pathRef.current,
          { d: [initialPath, leaveTargetPath] },
          {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
            onComplete: next,
          }
        );
      }}
      enter={(next) => {
        // animate(
        //   wrapperRef.current,
        //   { opacity: [0, 1], scale: 1 },
        //   {
        //     duration: 0.5,
        //   }
        // );
        animate(
          svgRef.current,
          { y: [0, "-100vh"] },
          {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }
        );
        animate(
          pathRef.current,
          { d: enterTargetPath },
          {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
            onComplete: next,
          }
        );
      }}
    >
      <div>{windowDimensions.width > 0 && <SVG />}</div>
      <div>{children}</div>

      <p
        className="text-xl font-semibold text-gray-800 absolute pointer-events-none inset-0 "
        ref={paraRef}
      >
        {routes[pathname as keyof Routes]}
      </p>

      <Debug />
    </TransitionRouter>
  );
}

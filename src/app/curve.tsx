"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react"; // Ensure you have motion installed
import { Debug } from "./components/debug";
import { useState, useEffect } from "react";

export default function CurveTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  // const wrapperRef = useRef<HTMLDivElement>(null!);
  const svgRef = useRef<SVGSVGElement>(null!);
  // Function to generate and assign refs
  const pathRef = useRef<SVGPathElement>(null!);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = windowDimensions;
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;
  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
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

  const SVG = () => {
    return (
      <svg
        ref={svgRef}
        className="fixed w-screen h-[calc(100dvh+600px)] left-0 top-[-300px] pointer-events-none invisible "
      >
        <path ref={pathRef} d={initialPath} />
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
            duration: 0.5,
            onComplete: next,
          }
        );
        animate(
          pathRef.current,
          { d: [initialPath] },
          {
            duration: 0.5,
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
            duration: 0.5,
            onComplete: next,
          }
        );
        animate(
          pathRef.current,
          { d: targetPath },
          {
            duration: 0.5,
            onComplete: next,
          }
        );
      }}
    >
      <div>{windowDimensions.width > 0 && <SVG />}</div>
      <div>{children}</div>

      <Debug />
    </TransitionRouter>
  );
}

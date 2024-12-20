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

  // Function to generate and assign refs

  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

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

  interface SVGProps {
    width: number;
    height: number;
  }
  const SVG = ({ width, height }: SVGProps) => {
    const initialPath = `
M0 300
Q${width / 2}
`;
    return (
      <svg>
        <path d={initialPath}></path>
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
      }}
      enter={(next) => {
        // animate(
        //   wrapperRef.current,
        //   { opacity: [0, 1], scale: 1 },
        //   {
        //     duration: 0.5,
        //   }
        // );
      }}
    >
      <div>{children}</div>
      <div>{windowDimensions.width > 0 && <SVG {...windowDimensions} />}</div>
      <Debug />
    </TransitionRouter>
  );
}

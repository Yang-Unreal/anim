"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react"; // Ensure you have motion installed
import { Debug } from "../debug";
export default function StairTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  // const wrapperRef = useRef<HTMLDivElement>(null!);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const TBgRef = useRef<HTMLDivElement>(null!);
  const nbOfColumns = 5;

  // Function to generate and assign refs
  const generateColumnRefs = () => {
    return [...Array(nbOfColumns)].map((_, i) => {
      return (ref: HTMLDivElement | null) => {
        columnRefs.current[i] = ref;
      };
    });
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
          TBgRef.current,
          { opacity: [0, 0.5], visibility: ["visible"] },
          {
            duration: 0.5,
          }
        );
        // On leave, move columns into viewport
        columnRefs.current.forEach((ref, index) => {
          if (ref && index == 0) {
            animate(
              ref,
              { y: [0, "100%"] },
              {
                duration: 0.2,
                delay: (nbOfColumns - index) * 0.05, // Stagger delay of 0.2 seconds
                ease: "easeInOut",
                onComplete: next,
              }
            );
          }
          if (ref && index > 0) {
            animate(
              ref,
              { y: [0, "100%"] },
              {
                duration: 0.2,
                delay: (nbOfColumns - index) * 0.05, // Stagger delay of 0.2 seconds
                ease: "easeInOut",
              }
            );
          }
        });
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
          TBgRef.current,
          { opacity: [0], visibility: ["hidden"] },
          {
            duration: 0.5,
          }
        );
        // Animate columns sliding back up
        columnRefs.current.forEach((ref, index) => {
          if (ref && index == 0) {
            animate(
              ref,
              { y: ["100%", "200%"] },
              {
                duration: 0.2,
                delay: (nbOfColumns - index) * 0.05, // Stagger delay of 0.2 seconds
                ease: "easeInOut",
                onComplete: next,
              }
            );
          }
          if (ref && index > 0) {
            animate(
              ref,
              { y: ["100%", "200%"] },
              {
                duration: 0.2,
                delay: (nbOfColumns - index) * 0.05, // Stagger delay of 0.2 seconds
                ease: "easeInOut",
              }
            );
          }
        });
      }}
    >
      <div
        ref={TBgRef}
        className="bg-black h-full w-full fixed inset-0 invisible"
      />
      <div
        className="flex h-full w-full fixed inset-0 -translate-y-full" // Initially hide above the viewport
      >
        {generateColumnRefs().map((ref, i) => (
          <div key={i} ref={ref} className="bg-[#D3FD50] w-full h-full"></div>
        ))}
      </div>
      <div>{children}</div>
      <Debug />
    </TransitionRouter>
  );
}

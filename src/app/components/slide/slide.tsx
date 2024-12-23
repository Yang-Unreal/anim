"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";

export default function Slides({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const slide = useRef<HTMLDivElement>(null!);
  const secondSlide = useRef<HTMLDivElement>(null!);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        // First layer animation
        animate(
          wrapperRef.current,
          { opacity: [1, 0.5], scale: 0.9 },
          {
            duration: 0.5,
          }
        );

        // Second layer animation with stagger effect
        animate(
          slide.current,
          { y: ["100%", 0] },
          {
            duration: 0.5,
            ease: [0.785, 0.135, 0.15, 0.86], // Cubic-bezier approximation for circ.inOut
          }
        );

        animate(
          secondSlide.current,
          { y: ["100%", 0] },
          {
            duration: 0.5,
            delay: 0.2, // Stagger delay of 0.2 seconds
            ease: [0.785, 0.135, 0.15, 0.86], // Cubic-bezier approximation for circ.inOut
            onComplete: next,
          }
        );

        // Assuming you want to call `next` after all animations complete
        // You might need to implement a custom logic here based on your requirements
      }}
      enter={(next) => {
        // Similar logic for the enter transition
        animate(
          wrapperRef.current,
          { opacity: [0, 1], scale: 1 },
          {
            duration: 0.7,
          }
        );

        animate(
          secondSlide.current,
          { y: [0, "-100%"] },
          {
            duration: 0.7,
            ease: [0.785, 0.135, 0.15, 0.86], // Cubic-bezier approximation for circ.inOut
          }
        );

        animate(
          slide.current,
          { y: [0, "-100%"] },
          {
            duration: 0.5,
            delay: 0.2, // Stagger delay of 0.2 seconds
            ease: [0.785, 0.135, 0.15, 0.86], // Cubic-bezier approximation for circ.inOut
            onComplete: next,
          }
        );
      }}
    >
      <div
        ref={slide}
        className="fixed inset-0 z-50 translate-y-full bg-[#E5EFD7]"
      ></div>
      <div
        ref={secondSlide}
        className="fixed inset-0 z-50 translate-y-full  bg-[#107885]"
      ></div>
      <div ref={wrapperRef}>{children}</div>
    </TransitionRouter>
  );
}

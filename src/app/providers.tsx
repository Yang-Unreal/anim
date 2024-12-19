"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "framer-motion"; // Ensure you have framer-motion installed

export default function Providers({ children }: { children: React.ReactNode }) {
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
          { opacity: [1, 0] },
          {
            duration: 0.5,
            onComplete: next,
          }
        );

        // Second layer animation with stagger effect
        animate(
          slide.current,
          { y: ["100%", 0] },
          {
            duration: 0.5,
            delay: 0.2, // Stagger delay of 0.2 seconds
            ease: "easeInOut",
            onComplete: next,
          }
        );

        animate(
          secondSlide.current,
          { y: ["100%", 0] },
          {
            duration: 0.5,
            delay: 0.4, // Stagger delay of 0.2 seconds
            ease: "easeInOut",
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
          { opacity: [0, 1] },
          {
            duration: 0.5,
            onComplete: next,
          }
        );

        animate(
          secondSlide.current,
          { y: [0, "-100%"] },
          {
            duration: 0.5,
            delay: 0.2, // Stagger delay of 0.2 seconds
            ease: "easeInOut",
            onComplete: next,
          }
        );

        animate(
          slide.current,
          { y: [0, "-100%"] },
          {
            duration: 0.5,

            delay: 0.4, // Stagger delay of 0.2 seconds
            ease: "easeInOut",
            onComplete: next,
          }
        );
      }}
    >
      <div
        ref={slide}
        className="fixed inset-0 z-50 translate-y-full bg-orange-500"
      ></div>
      <div
        ref={secondSlide}
        className="fixed inset-0 z-50 translate-y-full bg-red-500"
      ></div>
      <div ref={wrapperRef}>{children}</div>
    </TransitionRouter>
  );
}

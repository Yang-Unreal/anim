"use client";

import { useRef, useCallback, useEffect } from "react";

import { TransitionRouter } from "@/components/provider/transitionContextProvider";
import { animate } from "motion/react";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { generatePaths } from "@/lib/utils/pathGenerators";
import { TransitionText } from "./transitionText";
import { TransitionPath } from "@/components/curve/TransitionPath";
import type { ChildProps } from "@/lib/type";
import { TransitionProvider } from "@/components/provider/transitionTextProvider";

export default function CurveTransition({ children }: ChildProps) {
  const svgRef = useRef<SVGSVGElement>(null!);
  const pathRef = useRef<SVGPathElement>(null!);
  const paraRef = useRef<HTMLParagraphElement>(null!);

  const { width, height } = useWindowDimensions();

  const paths = generatePaths({ width, height });

  const disableScroll = useCallback(() => {
    // Save current scroll position
    const scrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollPosition}px`;
  }, []);

  const enableScroll = useCallback(() => {
    const scrollPosition = parseInt(document.body.style.top || "0");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("width");
    document.body.style.removeProperty("top");
    window.scrollTo(0, Math.abs(scrollPosition));
  }, []);

  const handleLeaveAnimation = useCallback(
    (next: () => void) => {
      if (!svgRef.current || !pathRef.current || !paraRef.current) {
        next();
        return;
      }
      disableScroll();

      Promise.all([
        animate(
          svgRef.current,
          { y: ["100vh", 0], visibility: ["visible"] },
          { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
        ),
        animate(
          pathRef.current,
          { d: [paths.initial, paths.leave] },
          { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
        ),
        animate(
          paraRef.current,
          { opacity: [0, 1], top: ["70%", "50%"] },
          { delay: 0.4, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
        ),
      ]).then(next);
    },
    [disableScroll, paths.initial, paths.leave]
  );

  const handleEnterAnimation = useCallback(
    (next: () => void) => {
      if (!svgRef.current || !pathRef.current || !paraRef.current) {
        next();
        return;
      }
      enableScroll();
      window.scrollTo({ top: 0 });
      disableScroll();

      Promise.all([
        animate(
          svgRef.current,
          { y: [0, "-100vh"], visibility: "hidden" },
          {
            duration: 0.7,
            ease: [1, 0, 0.35, 1],
            visibility: {
              duration: 0,
              delay: 0.7,
            },
          }
        ),
        animate(
          pathRef.current,
          { d: paths.enter },
          { duration: 0.7, ease: [0.45, 0, 0.55, 1] }
        ),
        animate(
          paraRef.current,
          { opacity: [1, 0], top: ["50%", "-10%"] },
          {
            opacity: {
              duration: 0.6,
              ease: [0.45, 0, 0.55, 1],
            },
            duration: 0.7,
            ease: [1, 0, 0.35, 1],
          }
        ),
      ]).then(() => {
        enableScroll();

        next();
      });
    },
    [disableScroll, enableScroll, paths.enter]
  );

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, [enableScroll]);

  return (
    <TransitionRouter
      auto={false}
      leave={handleLeaveAnimation}
      enter={handleEnterAnimation}
    >
      <TransitionProvider>
        {width > 0 && (
          <div>
            <TransitionPath svgRef={svgRef} pathRef={pathRef} />
            <TransitionText textRef={paraRef} />
          </div>
        )}
        {children}
      </TransitionProvider>
    </TransitionRouter>
  );
}

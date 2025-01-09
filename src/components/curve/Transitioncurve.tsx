"use client";

import { useRef, useCallback } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { generatePaths } from "@/lib/utils/pathGenerators";
import { TransitionText } from "./transitionText";
import { TransitionPath } from "@/components/curve/TransitionPath";
import type { ChildProps } from "@/lib/type";
import { TransitionProvider } from "@/components/provider/contextProvider";

export default function CurveTransition({ children }: ChildProps) {
  const svgRef = useRef<SVGSVGElement>(null!);
  const pathRef = useRef<SVGPathElement>(null!);
  const paraRef = useRef<HTMLParagraphElement>(null!);

  const { width, height } = useWindowDimensions();

  const paths = generatePaths({ width, height });

  const handleLeaveAnimation = useCallback(
    (next: () => void) => {
      if (!svgRef.current || !pathRef.current || !paraRef.current) {
        next();
        return;
      }

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
    [paths]
  );

  const handleEnterAnimation = useCallback(
    (next: () => void) => {
      if (!svgRef.current || !pathRef.current || !paraRef.current) {
        next();
        return;
      }

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
      ]).then(next);
    },
    [paths]
  );
  return (
    <TransitionRouter
      auto={true}
      leave={handleLeaveAnimation}
      enter={handleEnterAnimation}
    >
      <TransitionProvider>
        {children}

        {width > 0 && (
          <div>
            <TransitionPath svgRef={svgRef} pathRef={pathRef} />
            <TransitionText textRef={paraRef} />
          </div>
        )}
      </TransitionProvider>
    </TransitionRouter>
  );
}

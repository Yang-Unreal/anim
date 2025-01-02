"use client";

import { useRef, useCallback } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";
import { Debug } from "../debug";

import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { generatePaths } from "@/lib/utils/pathGenerators";
import { TransitionText } from "./transitionText";
import { TransitionPath } from "@/components/curve/TransitionPath";
import type { CurveTransitionProps } from "@/lib/type";

export default function CurveTransition({ children }: CurveTransitionProps) {
  const svgRef = useRef<SVGSVGElement>(null!);
  const pathRef = useRef<SVGPathElement>(null!);
  const paraRef = useRef<HTMLParagraphElement>(null!);

  const { width, height } = useWindowDimensions();

  const paths = generatePaths({ width, height });

  const handleLeaveAnimation = useCallback(
    (next: () => void) => {
      if (!svgRef.current || !pathRef.current) {
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

      const animations = Promise.all([
        animate(
          svgRef.current,
          { y: [0, "-100vh"] },
          { duration: 1.3, ease: [1, 0, 0.35, 1] }
        ),
        animate(
          pathRef.current,
          { d: paths.enter },
          { duration: 1.3, ease: [1, 0, 0.35, 1] }
        ),
      ]);

      const textAnimation = animate(
        paraRef.current,
        { opacity: [0, 1], top: ["55%", "50%"] },
        { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
      ).then(() =>
        animate(
          paraRef.current,
          { opacity: [1, 0], top: ["50%", "-10%"] },
          {
            opacity: {
              duration: 0.8,
              ease: [1, 0, 0.15, 1],
            },
            duration: 1,
            ease: [1, 0, 0.15, 1],
          }
        )
      );

      Promise.all([animations, textAnimation]).then(next);
    },
    [paths]
  );
  return (
    <TransitionRouter
      auto
      leave={handleLeaveAnimation}
      enter={handleEnterAnimation}
    >
      <div>
        {width > 0 && (
          <>
            <TransitionPath svgRef={svgRef} pathRef={pathRef} />
            <TransitionText textRef={paraRef} />
          </>
        )}
      </div>
      <div>{children}</div>
      <Debug />
    </TransitionRouter>
  );
}

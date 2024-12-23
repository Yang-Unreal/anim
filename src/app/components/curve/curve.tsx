"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";
import { Debug } from "../debug";

import { useWindowDimensions } from "@/app/lib/hooks/useWindowDimensions";
import { generatePaths } from "@/app/lib/utils/pathGenerators";
import { TransitionText } from "./transitionText";
import { TransitionPath } from "@/app/components/curve/TransitionPath";

export default function CurveTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const svgRef = useRef<SVGSVGElement>(null!);

  const pathRef = useRef<SVGPathElement>(null!);
  const paraRef = useRef<HTMLParagraphElement>(null!);

  const { width, height } = useWindowDimensions();
  const paths = generatePaths({ width, height });
  const handleLeaveAnimation = (next: () => void) => {
    if (!svgRef.current || !pathRef.current) return;
    animate(
      svgRef.current,
      { y: ["100vh", 0], visibility: ["visible"] },
      { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
    );
    animate(
      pathRef.current,
      { d: [paths.initial, paths.leave] },
      {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0],
        onComplete: next,
      }
    );
  };

  const handleEnterAnimation = (next: () => void) => {
    if (!svgRef.current || !pathRef.current || !paraRef.current) return;

    animate(
      svgRef.current,
      { y: [0, "-100vh"] },
      {
        duration: 1.3,
        ease: [1, 0, 0.35, 1],
      }
    );
    animate(
      pathRef.current,
      { d: paths.enter },
      {
        duration: 1.3,
        ease: [1, 0, 0.35, 1],
      }
    );

    animate(
      paraRef.current,
      { opacity: [0, 1], top: ["55%", "50%"] },
      { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
    ).then(() => {
      animate(
        paraRef.current,
        { opacity: [1, 0], top: ["50%", "-10%"] },
        {
          duration: 1,
          ease: [1, 0, 0.15, 1],
          onComplete: next,
        }
      );
    });
  };

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

import { memo } from "react";
import type { TransitionPathProps } from "@/lib/type";

export const TransitionPath = memo(function TransitionPath({
  svgRef,
  pathRef,
}: TransitionPathProps) {
  return (
    <svg
      ref={svgRef}
      className="fixed w-screen h-[calc(100dvh+600px)] left-0 top-[-300px] pointer-events-none z-[99] invisible"
    >
      <path ref={pathRef} />
    </svg>
  );
});

TransitionPath.displayName = "TransitionPath";

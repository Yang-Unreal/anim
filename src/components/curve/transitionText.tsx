import { memo } from "react";

import type { TransitionTextProps } from "@/lib/type";
import { UseTransitionTextState } from "@/components/provider/textProvider";
export const TransitionText = memo(function TransitionText({
  textRef,
}: TransitionTextProps) {
  const { transitionTextContent } = UseTransitionTextState();

  return (
    <p
      ref={textRef}
      className="text-[64px] font-semibold text-white absolute pointer-events-none left-[50%] top-[60%]  transform -translate-x-[50%] -translate-y-[50%] opacity-0 z-[100]"
    >
      {transitionTextContent}
    </p>
  );
});

TransitionText.displayName = "TransitionText";

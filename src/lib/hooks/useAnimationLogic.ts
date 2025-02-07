import { useEffect, useRef } from "react";
import type { AnimationState } from "@/components/preloader/preloader";

type Params = {
  state: AnimationState;
  dispatch: (action: "START" | "NEXT_WORD" | "EXIT" | "COMPLETE") => void;
  firstVisit: boolean;
  setShowPage: (show: boolean) => void;
};

export const useAnimationLogic = ({
  state,
  dispatch,
  firstVisit,
  setShowPage,
}: Params) => {
  const rafRef = useRef<number>(0);
  const startTime = useRef<number>(0);
  const wordsLength = 8; // Length of the words array

  // Start animation sequence on first visit
  useEffect(() => {
    if (firstVisit) {
      dispatch("START");
    }
  }, [firstVisit, dispatch]);

  // Handle word cycling
  useEffect(() => {
    const animateWords = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;

      const elapsed = timestamp - startTime.current;
      const targetDelay = state.wordIndex === 0 ? 1000 : 150;

      if (elapsed > targetDelay) {
        // Check if we've reached the last word
        if (state.wordIndex === wordsLength - 1) {
          dispatch("EXIT");
        } else {
          dispatch("NEXT_WORD");
        }
        startTime.current = timestamp;
      }

      if (state.status === "active") {
        rafRef.current = requestAnimationFrame(animateWords);
      }
    };

    if (state.status === "active") {
      rafRef.current = requestAnimationFrame(animateWords);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.status, state.wordIndex, dispatch]);

  // Handle exit sequence
  useEffect(() => {
    if (state.status === "exiting") {
      dispatch("COMPLETE");
      setShowPage(true);
      console.log("Complete");
    }
  }, [state.status, dispatch, setShowPage]);
};

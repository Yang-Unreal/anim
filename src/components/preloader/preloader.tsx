"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducer } from "react";
import { useFirstVisit } from "@/lib/hooks/useFirstVisit";
import { useAnimationLogic } from "@/lib/hooks/useAnimationLogic";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { usePreloaderContext } from "@/components/provider/preloaderContextProvider";
import { CurveAnimation } from "@/components/preloader/CurveAnimation";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

const slideUp = {
  initial: { y: 0 },
  animate: {
    y: "-100vh",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 2.2,
    },
  },
};

export type AnimationState = {
  status: "idle" | "active" | "exiting" | "complete";
  wordIndex: number;
};

function animationReducer(
  state: AnimationState,
  action: "START" | "NEXT_WORD" | "EXIT" | "COMPLETE"
): AnimationState {
  switch (action) {
    case "START":
      return { ...state, status: "active" };
    case "NEXT_WORD":
      return { ...state, wordIndex: state.wordIndex + 1 };
    case "EXIT":
      return { ...state, status: "exiting" };
    case "COMPLETE":
      return { ...state, status: "complete" };
    default:
      return state;
  }
}

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.8, delay: 0.2 } },
};

export const Preloader = () => {
  const { setShowPage } = usePreloaderContext();
  const firstVisit = useFirstVisit();
  const { width, height } = useWindowDimensions();
  const [state, dispatch] = useReducer(animationReducer, {
    status: "idle",
    wordIndex: 0,
  });

  useAnimationLogic({
    state,
    dispatch,
    firstVisit,
    setShowPage,
  });

  return (
    <AnimatePresence mode="wait">
      {state.status !== "complete" && width > 0 && (
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-[#141516]"
        >
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute flex items-center text-white text-4xl z-10"
          >
            {words[state.wordIndex]}
          </motion.p>
          <CurveAnimation width={width} height={height} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

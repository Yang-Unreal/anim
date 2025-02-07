"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducer, useEffect, useState } from "react";
// import { useFirstVisit } from "@/lib/hooks/useFirstVisit";
import { useAnimationLogic } from "@/lib/hooks/useAnimationLogic";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { usePreloaderContext } from "@/components/provider/preloaderContextProvider";

import type { WindowDimensions } from "@/lib/type";
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
  exit: {
    y: "-100vh",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
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
const curveAnimation = (dimension: WindowDimensions) => ({
  initial: {
    d: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
      dimension.width / 2
    } ${dimension.height + 300} 0 ${dimension.height} L0 0`,
  },
  exit: {
    d: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
      dimension.width / 2
    } ${dimension.height} 0 ${dimension.height} L0 0`,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
  },
});
const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.8, delay: 0.2 } },
};

export const Preloader = () => {
  const { setShowPage } = usePreloaderContext();
  // const firstVisit = useFirstVisit();
  const [firstVisit, setFirstVisit] = useState<boolean>(false);
  const dimension = useWindowDimensions();
  const [state, dispatch] = useReducer(animationReducer, {
    status: "idle",
    wordIndex: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("visited");
      if (visited === null) {
        sessionStorage.setItem("visited", "true");
        setFirstVisit(true);
      } else {
        setFirstVisit(false);
      }
    }
  }, [setShowPage]);

  useAnimationLogic({
    state,
    dispatch,
    firstVisit,
    setShowPage,
  });

  return (
    <AnimatePresence mode="wait">
      {state.status !== "complete" && dimension.width > 0 && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
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
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curveAnimation(dimension)}
              initial="initial"
              exit="exit"
              fill="#141516"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

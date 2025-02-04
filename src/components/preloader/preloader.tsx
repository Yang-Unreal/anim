"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
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

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const slideUp = {
  initial: { y: 0 },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const Preloader = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const dimension = useWindowDimensions();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("visited");
      if (visited === null) {
        sessionStorage.setItem("visited", "true");
        setIsFirstVisit(true);
      } else {
        setIsFirstVisit(false);
      }
    }
  }, []);

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

  useEffect(() => {
    if (index < words.length - 1) {
      const timer = setTimeout(
        () => setIndex(index + 1),
        index === 0 ? 1000 : 150
      );
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShowAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  useEffect(() => {
    if (isFirstVisit) {
      setShowAnimation(true);
    }
  }, [isFirstVisit]);

  return (
    <AnimatePresence mode="wait">
      {showAnimation && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-[#141516]"
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                exit="exit"
                className="absolute flex items-center text-white text-4xl z-10"
              >
                {words[index]}
              </motion.p>
              <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
                <motion.path
                  variants={curveAnimation(dimension)}
                  initial="initial"
                  exit="exit"
                  fill="#141516"
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

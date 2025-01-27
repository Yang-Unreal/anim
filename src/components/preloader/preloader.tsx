"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { isFirstVisit } from "@/lib/utils/isFirstVisit";
import { opacity, slideUp } from "./anim";

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

export default function Preloader() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    const firstVisit = isFirstVisit();
    setShowAnimation(firstVisit);

    if (firstVisit) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {showAnimation && (
        <motion.div
          key="preloader"
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[50] bg-[#141516]"
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute flex items-center text-white text-4xl z-10"
              >
                <span></span>
                {words[index]}
              </motion.p>
              <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
                <motion.path
                  fill="#141516"
                  variants={curve}
                  initial="initial"
                  exit="exit"
                ></motion.path>
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

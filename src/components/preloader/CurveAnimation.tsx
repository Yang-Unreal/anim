"use client";

import { motion } from "motion/react";

type Props = {
  width: number;
  height: number;
};

const curveVariants = (width: number, height: number) => ({
  initial: {
    d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${
      height + 300
    } 0 ${height} L0 0`,
  },
  exit: {
    d: `M0 0 L${width} 0 L${width} ${height} Q${
      width / 2
    } ${height} 0 ${height} L0 0`,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.3,
    },
  },
});

export const CurveAnimation = ({ width, height }: Props) => {
  return (
    <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
      <motion.path
        variants={curveVariants(width, height)}
        initial="initial"
        exit="exit"
        fill="#141516"
      />
    </svg>
  );
};

"use client";

import { useTransitionState } from "next-transition-router";
import { motion } from "motion/react";

export function Slide({ color }: { color: string }) {
  const { stage } = useTransitionState();

  const variants = {
    leaving: { opacity: 1, top: "0dvh" },
    entering: { opacity: 1, top: "100dvh" },
  };

  return (
    <motion.div
      className={`w-full h-full top-0 left-0 fixed ${color}`}
      initial={{ opacity: 1, z: 10, top: "100dvh" }}
      animate={stage === "leaving" ? variants.leaving : variants.entering}
      transition={{ duration: 2 }}
    />
  );
}

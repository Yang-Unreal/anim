"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-screen bg-[#141516] z-50"
    />
  );
}

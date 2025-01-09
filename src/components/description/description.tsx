"use client";

import { useInView, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { slideUp, opacity } from "@/lib/constants/description";
export default function Description() {
  const phrase =
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const description = useRef(null!);
  const isInView = useInView(description);

  const { scrollYProgress } = useScroll();
  const Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  return (
    <div
      ref={description}
      className="pl-[300px] pr-[300px] mt-[200px] flex justify-center mb-[250px] "
    >
      <div className="max-w-[1400px] flex gap-[50px] relative">
        <p className="m-0 text-[38px] gap-[8px]  leading-[1.3]">
          {phrase.split(" ").map((word, index) => {
            return (
              <span
                key={index}
                className="relative overflow-hidden inline-flex mr-[3px]"
              >
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                  className="mr-[3px]"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p
          variants={opacity}
          animate={isInView ? "open" : "closed"}
          className="text-[18px] w-[65%] font-light top-[10px] flex relative"
        >
          The combination of my passion for design, code & interaction positions
          me in a unique place in the web design world.
        </motion.p>
        <motion.div
          style={{ y: Y }}
          className="top-[200%] left-[calc(100%-270px)] w-[220px] h-[220px] bg-[#1C1D20] text-white rounded-full absolute flex items-center justify-center cursor-pointer"
        >
          <p className="m-0 text-[20px] font-light relative">About me</p>
        </motion.div>
      </div>
    </div>
  );
}

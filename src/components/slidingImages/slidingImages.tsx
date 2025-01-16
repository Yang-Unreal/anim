"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "c2.jpg",
  },
  {
    color: "#d6d7dc",
    src: "decimal.jpg",
  },
  {
    color: "#e3e3e3",
    src: "funny.jpg",
  },
  {
    color: "#21242b",
    src: "google.jpg",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "maven.jpg",
  },
  {
    color: "#e5e0e1",
    src: "panda.jpg",
  },
  {
    color: "#d7d4cf",
    src: "powell.jpg",
  },
  {
    color: "#e1dad6",
    src: "wix.jpg",
  },
];

export default function SlidingImages() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div
      ref={container}
      className="flex flex-col gap-12 relative mt-48 bg-white z-10 w-screen"
    >
      <motion.div
        style={{ x: x1 }}
        className="flex relative gap-12 w-[120vw] -left-[10vw]"
      >
        {slider1.map((project, index) => (
          <div
            key={index}
            className="w-1/4 h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-4/5 h-4/5">
              <Image
                fill={true}
                alt="image"
                src={`/images/${project.src}`}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ x: x2 }}
        className="flex relative gap-12 w-[120vw] -left-[10vw]"
      >
        {slider2.map((project, index) => (
          <div
            key={index}
            className="w-1/4 h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-4/5 h-4/5">
              <Image
                fill={true}
                alt="image"
                src={`/images/${project.src}`}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ height }} className="relative mt-24 bg-red-500">
        <div className="absolute h-[1550%] w-[120%] -left-[10%] rounded-b-[50%] bg-white z-10 shadow-[0_60px_50px_rgba(0,0,0,0.748)]" />
      </motion.div>
    </div>
  );
}

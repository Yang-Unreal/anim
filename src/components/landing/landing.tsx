"use client";

import Image from "next/image";
import InfiniteText from "@/components/infiniteText/infiniteText";
import { motion, useScroll, useTransform } from "motion/react";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { useRef } from "react";

export default function Landing() {
  const { width, height } = useWindowDimensions();
  const landingRef = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: landingRef,
    offset: ["start start", "end start"],
  });

  const Y = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div ref={landingRef} className=" flex relative">
      <div className="relative w-full h-screen flex overflow-hidden">
        <Image
          src="/images/background.jpg"
          alt="background"
          height={height}
          width={width}
          className="object-cover h-auto"
          sizes="100vw"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <InfiniteText />
        <motion.div
          style={{ y: Y }}
          className="absolute top-[20%] left-[65%]  text-[24px] font-light font-formula"
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-[2] mb-5"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </svg>
          <p>FREELANCE</p>
          <p>DESIGNER & DEVELOPER</p>
        </motion.div>
      </div>
    </div>
  );
}

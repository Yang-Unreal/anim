"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "motion/react";

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="flex flex-col items-center justify-center bg-[#141516] relative text-white"
    >
      <div className="pt-48 w-full max-w-[1800px] bg-[#141516]">
        <div className=" border-b border-gray-500 pb-24 mx-[250px] relative font-formula">
          <span className="flex items-center ">
            <div className="w-24 h-24 relative rounded-full overflow-hidden -top-[8px]">
              <Image
                fill={true}
                alt="image"
                src="/images/background.jpg"
                className="object-cover "
              />
            </div>
            <h2 className="text-[5vw]   pl-10">LET&apos;S WORK</h2>
          </span>
          <h2 className="text-[5vw]  m-0">TOGETHER</h2>

          <motion.div
            style={{ x }}
            className="absolute left-[calc(100%-400px)] top-[calc(100%-110px)]"
          >
            <div className="w-[220px] h-[220px] bg-[#455ce9] text-white rounded-full absolute flex items-center justify-center cursor-pointer">
              <p className="m-0 top-1 text-[28px] relative z-10">
                GET IN TOUCH
              </p>
            </div>
          </motion.div>

          <motion.svg
            style={{ rotate, scale: 3 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[50%] right-0"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>

        <div className="flex gap-5 mt-24 mx-[250px]">
          <p className="hover:after:w-full after:content-[''] after:w-0 after:h-px after:bg-white after:block after:mt-0.5 after:relative after:left-1/2 after:-translate-x-1/2 after:transition-[width] after:duration-200 after:ease-linear">
            info@dennissnellenberg.com
          </p>
          <p className="hover:after:w-full after:content-[''] after:w-0 after:h-px after:bg-white after:block after:mt-0.5 after:relative after:left-1/2 after:-translate-x-1/2 after:transition-[width] after:duration-200 after:ease-linear">
            +31 6 27 84 74 30
          </p>
        </div>

        <div className="flex justify-between mt-20 py-5 px-10">
          <div className="flex gap-2.5 items-end">
            <span className="flex flex-col gap-4">
              <h3 className="m-0 p-0.5 text-gray-400 font-light text-base cursor-default">
                Version
              </h3>
              <p className="m-0 p-0.5">2025 © Edition</p>
            </span>
            <span className="flex flex-col gap-4">
              <h3 className="m-0 p-0.5 text-gray-400 font-light text-base cursor-default">
                Local Time
              </h3>
              <p className="m-0 p-0.5">11:49 PM GMT+2</p>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="m-0 p-0.5 text-gray-400 font-light text-base cursor-default">
              socials
            </h3>
            <div className="flex gap-5">
              {["Awwwards", "Instagram", "Dribbble", "Linkedin"].map(
                (social, index) => (
                  <p
                    key={index}
                    className="m-0 p-0.5 cursor-pointer hover:after:w-full after:content-[''] after:w-0 after:h-px after:bg-white after:block after:mt-0.5 after:relative after:left-1/2 after:-translate-x-1/2 after:transition-[width] after:duration-200 after:ease-linear"
                  >
                    {social}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

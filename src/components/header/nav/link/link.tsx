"use client";

import { motion } from "motion/react";
import { slide, scale } from "@/lib/constants/nav";
// import Link from "next/link";
import { CustomLinkProps } from "@/lib/type";

// import { useTransitionState } from "@/lib/utils/pageTransition/index";
import { useTransitionState } from "@/lib/utils/pageTransition/transition";
import { Link } from "@/lib/utils/pageTransition/transition";
import {
  UseTransitionTextState,
  UseMenuState,
} from "@/components/provider/contextProvider";
import { usePathname } from "next/navigation";

export default function CustomLink({
  data,
  isActive,
  setSelectedIndicator,
}: CustomLinkProps) {
  const pathname = usePathname();

  const { setTransitionTextContent } = UseTransitionTextState();
  const { setMenuIsActive } = UseMenuState();
  const { title, href, index } = data;
  const { stage } = useTransitionState();
  const isTransitionCompleted = stage == "none";

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute -left-[30px] h-2.5 w-2.5 rounded-full bg-white"
      />
      <Link
        href={href}
        className={`${
          isTransitionCompleted ? "" : "pointer-events-none"
        } font-formula`}
        onClick={() => {
          setMenuIsActive(false);
          setTransitionTextContent(title);
          if (href === pathname) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        {title}
      </Link>
    </motion.div>
  );
}

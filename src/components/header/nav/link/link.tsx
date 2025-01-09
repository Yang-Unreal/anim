// import Link from "next/link";
import { motion } from "motion/react";
import { slide, scale } from "@/lib/constants/nav";
import { useTransitionState } from "next-transition-router";
import { CustomLinkProps } from "@/lib/type";
import { Link as TransitionLink } from "next-transition-router";
import {
  UseTransitionTextState,
  UseMenuState,
} from "@/components/provider/contextProvider";
export default function CustomLink({
  data,
  isActive,
  setSelectedIndicator,
}: CustomLinkProps) {
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
      onClick={() => {
        setTransitionTextContent(title);
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
      <TransitionLink
        href={href}
        className={`${isTransitionCompleted ? "" : "pointer-events-none"}`}
        onClick={() => setMenuIsActive(false)}
      >
        {title}
      </TransitionLink>
    </motion.div>
  );
}

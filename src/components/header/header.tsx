"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import Nav from "@/components/header/nav/nav";
import { MenuButton } from "./MenuButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UseMenuState } from "../provider/contextProvider";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";

export default function Header() {
  const { menuIsActive, setMenuIsActive } = UseMenuState();

  const button = useRef<HTMLButtonElement>(null!);
  const height = useWindowDimensions().height;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: height / 2,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
          });
          setMenuIsActive(false);
        },
      },
    });
  });

  return (
    <>
      <MenuButton
        isActive={menuIsActive}
        ref={button}
        onClick={() => setMenuIsActive(!menuIsActive)}
      />

      <AnimatePresence mode="wait">{menuIsActive && <Nav />}</AnimatePresence>
    </>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import Nav from "@/components/header/nav/nav";
import { MenuButton } from "./MenuButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UseTransitionTextState,
  UseMenuState,
} from "@/components/provider/contextProvider";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";

// import { useTransitionState } from "@/lib/utils/pageTransition/index";
import { useTransitionState } from "@/lib/utils/pageTransition/transition";

import { Link } from "@/lib/utils/pageTransition/transition";
// import Link from "next/link";

export default function Header() {
  const { menuIsActive, setMenuIsActive } = UseMenuState();
  const { setTransitionTextContent } = UseTransitionTextState();
  const button = useRef<HTMLButtonElement>(null!);
  const height = useWindowDimensions().height;
  const { stage } = useTransitionState();
  const isTransitionCompleted = stage == "none";
  const transitionCursor = `${
    isTransitionCompleted ? "cursor-pointer" : "pointer-events-none"
  }`;
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: height / 6,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.3,
            ease: "power4.in",
          });
          setMenuIsActive(false);
        },
      },
    });
  });

  return (
    <>
      <div className="flex absolute z-20 top-0 left-0 w-full items-center justify-between px-[40px] py-5 text-black box-border text-lg ">
        <Link
          className={`flex cursor-pointer group ${transitionCursor}`}
          href={"/"}
          onClick={() => {
            setTransitionTextContent("Home");
          }}
        >
          <p className=" transition-logo group-hover:rotate-[360deg] origin-center">
            ©
          </p>
          <div className="flex relative overflow-hidden whitespace-nowrap ml-[5px] transition-logo group-hover:pr-[40px] ">
            <p className="relative transition-logo group-hover:-translate-x-full ">
              Code by
            </p>
            <p className="relative transition-logo pl-[0.3em] group-hover:-translate-x-[72px] ">
              Dennis
            </p>
            <p className="absolute left-[120px] transition-logo pl-[0.8em] group-hover:-translate-x-[65px] ">
              Snellenberg
            </p>
          </div>
        </Link>
        <div className="flex items-center text-[18px]">
          <Link
            href={"/work"}
            onClick={() => {
              setTransitionTextContent("Work");
            }}
            className={`header-nav-link group ${transitionCursor}`}
          >
            <p>Work</p>
            <div className="indicator"></div>
          </Link>

          <Link
            href={"/about"}
            onClick={() => {
              setTransitionTextContent("About");
            }}
            className={`header-nav-link group ${transitionCursor}`}
          >
            <p>About</p>
            <div className="indicator"></div>
          </Link>

          <Link
            href={"/contact"}
            onClick={() => {
              setTransitionTextContent("Contact");
            }}
            className={`header-nav-link group ${transitionCursor}`}
          >
            <p>Contact</p>
            <div className="indicator"></div>
          </Link>
        </div>
      </div>
      <MenuButton
        isActive={menuIsActive}
        ref={button}
        onClick={() => setMenuIsActive(!menuIsActive)}
      />

      <AnimatePresence mode="wait">{menuIsActive && <Nav />}</AnimatePresence>
    </>
  );
}

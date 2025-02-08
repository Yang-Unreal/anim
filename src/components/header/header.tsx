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
} from "@/components/provider/transitionTextProvider";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { useTransitionState } from "@/lib/hooks/useTransitionState";
import { usePreloaderContext } from "../provider/preloaderContextProvider";
import { Link } from "@/components/customLink/customLink";
// import Link from "next/link";

export default function Header() {
  const { showPage } = usePreloaderContext();
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
    <div className={`${showPage ? "opacity-100" : "opacity-0"} `}>
      <div className="flex absolute z-[33] top-0 left-0 w-full items-center justify-between px-[40px] py-5  box-border text-[20px] ">
        <Link
          className={`flex top-0 cursor-pointer group  ${transitionCursor} -translate-y-[30%]`}
          href={"/"}
          onClick={() => {
            setTransitionTextContent("Home");
          }}
        >
          <p className=" transition-logo  group-hover:rotate-[360deg] origin-center ">
            ©
          </p>
          <div className="flex w-[50%] relative overflow-hidden whitespace-nowrap ml-[5px] transition-logo group-hover:pr-[70%]   ">
            <p className="transition-logo group-hover:-translate-x-[29%] ">
              CODE BY DENNIS SNELLENBERG
            </p>
          </div>
        </Link>
        <div className="flex items-center text-[28px] ">
          <Link
            href={"/work"}
            onClick={() => {
              setTransitionTextContent("WORK");
            }}
            className={`header-nav-link group ${transitionCursor} `}
          >
            <p>WORK</p>
            <div className="indicator"></div>
          </Link>

          <Link
            href={"/about"}
            onClick={() => {
              setTransitionTextContent("ABOUT");
            }}
            className={`header-nav-link group ${transitionCursor}`}
          >
            <p>ABOUT</p>
            <div className="indicator"></div>
          </Link>

          <Link
            href={"/contact"}
            onClick={() => {
              setTransitionTextContent("CONTACT");
            }}
            className={`header-nav-link group ${transitionCursor}`}
          >
            <p>CONTACT</p>
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
    </div>
  );
}

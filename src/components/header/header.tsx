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
      <div className="flex absolute z-20 top-0 left-0 w-full items-center justify-between px-[40px] py-5 text-black box-border text-lg">
        <div className="flex cursor-pointer group ">
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
        </div>
        <div className="flex items-center text-[18px]">
          <div className="header-nav-link group">
            <a href={"/work"}>Work</a>
            <div className="indicator"></div>
          </div>

          <div className="header-nav-link group">
            <a href={"/about"}>About</a>
            <div className="indicator"></div>
          </div>

          <div className="header-nav-link group">
            <a>Contact</a>
            <div className="indicator "></div>
          </div>
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

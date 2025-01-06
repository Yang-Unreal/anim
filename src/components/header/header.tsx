"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Nav from "@/components/header/nav/nav";
import { MenuButton } from "./MenuButton";
export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <MenuButton isActive={isActive} onClick={() => setIsActive(!isActive)} />
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}

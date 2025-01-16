"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { menuSlide } from "@/lib/constants/nav";
import NavContent from "./navContent";
import Curve from "@/components/header/nav/curve/MenuCurve";
import Footer from "@/components/header/nav/footer/footer";

export default function Nav() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 h-screen bg-[#292929] text-white z-[29]"
    >
      <div className="flex h-full flex-col justify-between box-border p-24">
        <NavContent
          selectedIndicator={selectedIndicator}
          setSelectedIndicator={setSelectedIndicator}
          pathname={pathname}
        />
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}

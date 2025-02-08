"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";
import { generatePaths } from "@/lib/utils/pathGenerators";
import { NAVIGATION_ITEMS } from "@/lib/constants/nav";
import { useRefreshDetection } from "@/lib/hooks/useRefreshDetection";

const ReloadAnimation = () => {
  const [isRefreshed, setIsRefreshed] = useRefreshDetection();
  const pathname = usePathname();
  const svgRef = useRef<SVGSVGElement>(null!);
  const pathRef = useRef<SVGPathElement>(null!);
  const textRef = useRef<HTMLParagraphElement>(null!);
  const { width, height } = useWindowDimensions();
  const paths = generatePaths({ width, height });

  const disableScroll = () => {
    const scrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollPosition}px`;
  };

  const enableScroll = () => {
    const scrollPosition = parseInt(document.body.style.top || "0");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("width");
    document.body.style.removeProperty("top");
    window.scrollTo(0, Math.abs(scrollPosition));
  };

  useEffect(() => {
    if (isRefreshed) {
      disableScroll();
      const performAnimations = async () => {
        // Enter animation (Slide in)
        await Promise.all([
          animate(
            svgRef.current,

            { y: ["100vh", 0], visibility: "visible" },
            {
              duration: 0.5,
              ease: [0.7, 0, 0.84, 0],
            }
          ),
          animate(
            pathRef.current,

            { d: [paths.initial, paths.leave] },
            { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
          ),
          animate(
            textRef.current,
            { opacity: [0, 1], top: ["70%", "50%"] },
            { delay: 0.4, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
          ),
        ]);

        // Pause before exit
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Exit animation (Slide out)
        await Promise.all([
          animate(
            svgRef.current,
            { y: [0, "-100vh"], visibility: "hidden" },
            { duration: 0.7, ease: [1, 0, 0.35, 1] }
          ),
          animate(
            pathRef.current,
            { d: paths.enter },
            { duration: 0.7, ease: [0.45, 0, 0.55, 1] }
          ),
          animate(
            textRef.current,
            { opacity: [1, 0], top: ["50%", "-10%"] },
            { duration: 0.7, ease: [1, 0, 0.35, 1] }
          ),
        ]);

        enableScroll();
        setIsRefreshed(false);
      };

      performAnimations();
    }
  }, [isRefreshed, paths, setIsRefreshed]);

  const getCurrentTitle = () => {
    const currentItem = NAVIGATION_ITEMS.find((item) => item.href === pathname);
    return currentItem ? currentItem.title : pathname;
  };

  if (!isRefreshed || width === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        className="fixed w-screen h-[calc(100dvh+600px)] left-0 top-[-300px] pointer-events-none z-[100] invisible"
      >
        <path ref={pathRef} fill="#141516" />
      </svg>
      <p
        ref={textRef}
        className="fixed left-1/2 -translate-x-1/2 text-white text-4xl font-mono z-[101] opacity-0"
        style={{ top: "70%" }}
      >
        {getCurrentTitle()}
      </p>
    </div>
  );
};

export default ReloadAnimation;

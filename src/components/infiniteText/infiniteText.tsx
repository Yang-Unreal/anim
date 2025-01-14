"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InfiniteText() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  const direction = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (slider.current) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (direction.current = e.direction * -1),
        },
        x: "-200px",
      });
    }

    requestAnimationFrame(animate);
  });

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
    }
    requestAnimationFrame(animate);
    xPercent += 0.01 * direction.current;
  };

  return (
    <div className="w-full h-full overflow-hidden flex relative">
      <div className="absolute bottom-0">
        <div ref={slider} className="relative whitespace-nowrap font-formula">
          <p
            ref={firstText}
            className="relative m-0 text-white text-[150px]  pr-10"
          >
            LET THE HIDDEN PEARLS SHINE FOR THE WORLD -
          </p>
          <p
            ref={secondText}
            className="absolute left-full top-0 m-0 text-white text-[150px]  pr-10"
          >
            LET THE HIDDEN PEARLS SHINE FOR THE WORLD -
          </p>
        </div>
      </div>
    </div>
  );
}

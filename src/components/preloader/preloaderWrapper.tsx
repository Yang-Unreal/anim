"use client";

import { useEffect, useState } from "react";
import Preloader from "./preloader";

export default function PreloaderWrapper() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedHome");
    if (!hasVisited) {
      sessionStorage.setItem("hasVisitedHome", "true");
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  return <Preloader />;
}

import { useState, useEffect, useCallback } from "react";
import type { WindowDimensions } from "@/app/lib/type";

export const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Only update if dimensions actually changed
    setDimensions((prev) => {
      if (prev.width === width && prev.height === height) {
        return prev;
      }
      return { width, height };
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return dimensions;
};

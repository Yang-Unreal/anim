"use client";

import { useState, useEffect } from "react";
import { useFirstVisit } from "@/lib/hooks/useFirstVisit";
export function useRefreshDetection(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [isRefreshed, setIsRefreshed] = useState(false);
  const firstVisit = useFirstVisit();
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Set a flag in sessionStorage before the page unloads
      sessionStorage.setItem("isRefreshing", "true");
    };

    const checkIfRefreshed = () => {
      const refreshFlag = sessionStorage.getItem("isRefreshing");
      if (refreshFlag && !firstVisit) {
        setIsRefreshed(true);
        // Clear the flag
        sessionStorage.removeItem("isRefreshing");
      }
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Check if the page was refreshed on mount
    checkIfRefreshed();

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [firstVisit]);

  return [isRefreshed, setIsRefreshed];
}

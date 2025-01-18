"use client";

import { useState, useEffect } from "react";

export function useRefreshDetection(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Set a flag in sessionStorage before the page unloads
      sessionStorage.setItem("isRefreshing", "true");
    };

    const checkIfRefreshed = () => {
      const refreshFlag = sessionStorage.getItem("isRefreshing");
      if (refreshFlag) {
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
  }, []);

  return [isRefreshed, setIsRefreshed];
}

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ChildProps } from "@/lib/type";
interface PreloaderContextType {
  showPage: boolean;
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreloaderContext = createContext<PreloaderContextType>({
  showPage: false,
  setShowPage: () => {},
});

export function PreloaderContextProvider({ children }: ChildProps) {
  const [showPage, setShowPage] = useState<boolean>(false);
  useEffect(() => {
    // Client-side check after mount
    const visited = sessionStorage.getItem("visited");
    if (visited) setShowPage(true);
  }, []);
  return (
    <PreloaderContext.Provider value={{ showPage, setShowPage }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function UsePreloaderState() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloaderState must be used within a MyProvider");
  }
  return context;
}

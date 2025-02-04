"use client";

import { createContext, useContext, useState } from "react";
import { ChildProps } from "@/lib/type";
interface PreloaderContextType {
  showPreloader: boolean;
  setShowPreloader: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreloaderContext = createContext<PreloaderContextType>({
  showPreloader: false,
  setShowPreloader: () => {},
});

export function PreloaderContextProvider({ children }: ChildProps) {
  const [showPreloader, setShowPreloader] = useState<boolean>(false);

  return (
    <PreloaderContext.Provider value={{ showPreloader, setShowPreloader }}>
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

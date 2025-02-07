"use client";

import { createContext, useContext, useState } from "react";

type PreloaderContextType = {
  showPage: boolean;
  setShowPage: (show: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextType>({
  showPage: false,
  setShowPage: () => {},
});

export function PreloaderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPage, setShowPage] = useState(false);

  return (
    <PreloaderContext.Provider value={{ showPage, setShowPage }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloaderContext = () => useContext(PreloaderContext);

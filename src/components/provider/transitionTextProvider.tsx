"use client";

import { createContext, useContext, useState } from "react";
import { ChildProps } from "@/lib/type";
interface TransitionContextType {
  transitionTextContent: string;
  setTransitionTextContent: React.Dispatch<React.SetStateAction<string>>;
}

const TransitionTextContext = createContext<TransitionContextType>({
  transitionTextContent: "",
  setTransitionTextContent: () => {},
});

export function TransitionProvider({ children }: ChildProps) {
  const [transitionTextContent, setTransitionTextContent] =
    useState<string>("");

  return (
    <TransitionTextContext.Provider
      value={{ transitionTextContent, setTransitionTextContent }}
    >
      {children}
    </TransitionTextContext.Provider>
  );
}

export function UseTransitionTextState() {
  const context = useContext(TransitionTextContext);
  if (!context) {
    throw new Error("useTransitionState must be used within a MyProvider");
  }
  return context;
}

interface MenuContextType {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextType>({
  menuIsActive: false,
  setMenuIsActive: () => {},
});

export function MenuProvider({ children }: ChildProps) {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ menuIsActive, setMenuIsActive }}>
      {children}
    </MenuContext.Provider>
  );
}

export function UseMenuState() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useTransitionState must be used within a MyProvider");
  }
  return context;
}

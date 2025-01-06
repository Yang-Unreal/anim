import { createContext, useContext, useState } from "react";
import { ChildProps } from "@/lib/type";
interface TransitionContextType {
  transitionTextContent: string;
  setTransitionTextContent: React.Dispatch<React.SetStateAction<string>>;
}

const TransitionContext = createContext<TransitionContextType>({
  transitionTextContent: "",
  setTransitionTextContent: () => {},
});

export function TransitionProvider({ children }: ChildProps) {
  const [transitionTextContent, setTransitionTextContent] =
    useState<string>("");

  return (
    <TransitionContext.Provider
      value={{ transitionTextContent, setTransitionTextContent }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function UseTransitionTextState() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionState must be used within a MyProvider");
  }
  return context;
}

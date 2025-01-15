import { useContext } from "react";
import type { TransitionRouterContextType } from "@/lib/type";
import { TransitionRouterContext } from "@/components/provider/transitionContextProvider";
export const useTransitionState = (): TransitionRouterContextType =>
  useContext(TransitionRouterContext);

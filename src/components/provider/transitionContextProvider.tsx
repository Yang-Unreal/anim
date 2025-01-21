"use client";

import {
  createContext,
  useState,
  useRef,
  useTransition,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { useRouter, usePathname } from "next/navigation";
import delegate, { DelegateEvent } from "delegate-it";
import { isModifiedEvent } from "@/lib/utils/isModifiedEvent";
import type {
  Stage,
  TransitionRouterProps,
  TransitionRouterContextType,
  NavigateProps,
} from "@/lib/type";
// import { useRefreshDetection } from "@/lib/hooks/useRefreshDetection";

export const TransitionRouterContext =
  createContext<TransitionRouterContextType>({
    stage: "none",
    navigate: () => {},
    isReady: false,
  });

export const TransitionRouter = ({
  children,
  leave = async (next) => next(),
  enter = async (next) => next(),
  auto = false,
}: TransitionRouterProps) => {
  // const [isRefreshed] = useRefreshDetection();

  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("none");
  const leaveRef = useRef<(() => void) | null>(null);
  const enterRef = useRef<(() => void) | null>(null);
  const isSamePageRef = useRef<boolean>(false);
  const completeLeaveRef = useRef<(() => void) | null>(null);
  const [isPending, startTransition] = useTransition();

  const navigate: NavigateProps = useCallback(
    async (href, pathname, method = "push", options?) => {
      // Clear any existing enter cleanup
      if (typeof enterRef.current === "function") {
        enterRef.current();
        enterRef.current = null;
      }

      const isSamePage = href === pathname;
      if (isSamePage) return;

      isSamePageRef.current = isSamePage;

      setStage("leaving");

      const performNavigation = () => {
        if (!isSamePageRef.current) {
          startTransition(() => router[method](href, options));
        } else {
          completeLeaveRef.current?.();
        }
      };

      try {
        const leaveComplete = new Promise<void>((resolve) => {
          completeLeaveRef.current = resolve;
        });
        // Executes leave callback and stores cleanup
        leaveRef.current = (await Promise.resolve(
          leave(performNavigation, pathname, href)
        )) as (() => void) | null;

        if (isSamePageRef.current) {
          await leaveComplete;
          // Execute leave cleanup for same-page transitions
          if (typeof leaveRef.current === "function") {
            leaveRef.current();
            leaveRef.current = null;
          }

          setStage("entering");
        }
      } catch (error) {
        console.error("Navigation error:", error);
        setStage("none");
      }
    },
    [leave, router, startTransition]
  );

  const handleClick = useCallback(
    (event: DelegateEvent<MouseEvent>) => {
      const anchor = event.delegateTarget as HTMLAnchorElement;
      const href = anchor?.getAttribute("href");
      const ignore = anchor?.getAttribute("data-transition-ignore");
      const url = href ? new URL(href, window.location.origin) : null;
      const targetPathname = url?.pathname;

      if (href === pathname) {
        event.preventDefault();
        return;
      }

      if (
        !ignore &&
        href?.startsWith("/") &&
        anchor.target !== "_blank" &&
        !isModifiedEvent(event) &&
        !(href.includes("#") && targetPathname === pathname)
      ) {
        event.preventDefault();
        navigate(href, pathname);
      }
    },
    [navigate, pathname]
  );

  useEffect(() => {
    if (!auto) return;

    const controller = new AbortController();
    delegate("a[href]", "click", handleClick, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [auto, handleClick]);

  useEffect(() => {
    if (stage === "entering") {
      const runEnter = async () => {
        // Store new cleanup function from enter callback
        try {
          enterRef.current = (await Promise.resolve(
            enter(() => {
              setStage("none");
              isSamePageRef.current = false;
              completeLeaveRef.current = null;
            })
          )) as (() => void) | null;
        } catch (error) {
          console.error("Enter animation error:", error);
          setStage("none");
        }
      };
      runEnter();
    }
  }, [stage, enter]);

  // useEffect(() => {
  //   if (isRefreshed == true) {
  //     console.log(isRefreshed);
  //     try {
  //       enter(() => {});
  //     } catch {}
  //   }
  // }, [enter, isRefreshed]);

  // Component unmounts during navigation
  useEffect(() => {
    return () => {
      // Execute leave cleanup when leaving page
      if (stage === "leaving" && !isSamePageRef.current) {
        if (typeof leaveRef.current === "function") {
          leaveRef.current();
          leaveRef.current = null;
        }
        setStage("entering");
      }
    };
  }, [stage, pathname]);

  const value = useMemo<TransitionRouterContextType>(
    () => ({
      stage,
      navigate,
      isReady: stage !== "entering" && !isPending,
    }),
    [stage, navigate, isPending]
  );

  return (
    <TransitionRouterContext.Provider value={value}>
      {children}
    </TransitionRouterContext.Provider>
  );
};

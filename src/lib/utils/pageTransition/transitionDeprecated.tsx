// "use client";

// import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { UrlObject } from "url";
// import NextLink from "next/link";
// import { jsx } from "react/jsx-runtime";
// import type { ReactElement } from "react";
// import type { LinkProps } from "next/link";

// import {
//   useState,
//   useRef,
//   useCallback,
//   useEffect,
//   useMemo,
//   use,
//   createContext,
//   ReactNode,
// } from "react";
// import delegate from "delegate-it";
// import { useRouter, usePathname } from "next/navigation";
// import { format } from "url";

// function isModifiedEvent(event: MouseEvent | React.MouseEvent): boolean {
//   const eventTarget =
//     "delegateTarget" in event
//       ? (event.delegateTarget as HTMLElement)
//       : (event.currentTarget as HTMLElement);

//   const target = eventTarget.getAttribute("target");

//   return (
//     (target && target !== "_self") ||
//     event.metaKey ||
//     event.ctrlKey ||
//     event.shiftKey ||
//     event.altKey || // triggers resource download
//     event.button === 1 // middle mouse button
//   );
// }

// type Stage = "leaving" | "entering" | "none";

// type Url = string | UrlObject;

// type TransitionCallback = (
//   next: () => void,
//   from?: string,
//   to?: string
// ) => Promise<(() => void) | void> | ((() => void) | void);

// type NavigateProps = (
//   href: string,
//   pathname: string,
//   method?: "push" | "replace" | "back",
//   options?: NavigateOptions
// ) => void;

// interface TransitionRouterContextType {
//   stage: Stage;
//   //   setStage: Dispatch<SetStateAction<Stage>>;
//   navigate: NavigateProps;
//   isReady: boolean;
// }

// interface DelegateEvent extends MouseEvent {
//   delegateTarget: HTMLElement;
// }

// interface ExtendedRouter extends ReturnType<typeof useRouter> {
//   push: (href: Url, options?: NavigateOptions) => void;
//   replace: (href: Url, options?: NavigateOptions) => void;
//   back: () => void;
// }

// function getUrlAsString(url: Url): string {
//   return typeof url === "string" ? url : format(url);
// }

// function _extends<T extends object, U extends object>(
//   target: T,
//   source: U
// ): T & U {
//   return Object.assign({}, target, source);
// }

// interface TransitionLinkProps extends Omit<LinkProps, "href"> {
//   href: Url;
//   as?: Url;
//   replace?: boolean;
//   scroll?: boolean;
//   onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
// }

// const TransitionRouterContext = createContext<TransitionRouterContextType>({
//   stage: "none",
//   //   setStage: () => {},
//   navigate: () => {},
//   isReady: false,
// });

// interface TransitionRouterProps {
//   children: ReactNode;
//   leave?: TransitionCallback;
//   enter?: TransitionCallback;
//   auto?: boolean;
// }

// export function TransitionRouter({
//   children,
//   leave = async (next) => next(),
//   enter = async (next) => next(),
//   auto = false,
// }: TransitionRouterProps): ReactElement {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [stage, setStage] = useState<Stage>("none");
//   const leaveRef = useRef<(() => void) | null>(null);
//   const enterRef = useRef<(() => void) | null>(null);
//   const isSamePageRef = useRef<boolean>(false);
//   const completeLeaveRef = useRef<(() => void) | null>(null);

//   const navigate: NavigateProps = useCallback(
//     async (href, pathname, method = "push", options?) => {
//       if (typeof enterRef.current === "function") {
//         enterRef.current();
//         enterRef.current = null;
//       }

//       const isSamePage = href === pathname;
//       if (isSamePage) {
//         return;
//       }
//       isSamePageRef.current = isSamePage;

//       setStage("leaving");

//       const performNavigation = () => {
//         if (!isSamePage) {
//           router[method](href, options);
//           return Promise.resolve();
//         }
//         if (completeLeaveRef.current) {
//           completeLeaveRef.current();
//         }
//         return Promise.resolve();
//       };

//       try {
//         const leaveComplete = new Promise<void>((resolve) => {
//           completeLeaveRef.current = resolve;
//         });

//         leaveRef.current = (await leave(performNavigation, pathname, href)) as
//           | (() => void)
//           | null;

//         if (isSamePage) {
//           await leaveComplete;

//           if (typeof leaveRef.current === "function") {
//             leaveRef.current();
//             leaveRef.current = null;
//           }

//           setStage("entering");
//         }
//       } catch (error) {
//         console.error("Navigation error:", error);
//         setStage("none");
//       }
//     },
//     [leave, router]
//   );

//   const handleClick = useCallback(
//     (event: DelegateEvent) => {
//       const anchor = event.delegateTarget as HTMLAnchorElement;
//       const href = anchor?.getAttribute("href");
//       const ignore = anchor?.getAttribute("data-transition-ignore");
//       const url = href ? new URL(href, window.location.origin) : null;
//       const targetPathname = url?.pathname;

//       if (href === pathname) {
//         event.preventDefault();
//         return;
//       }

//       if (
//         !ignore &&
//         href?.startsWith("/") &&
//         anchor.target !== "_blank" &&
//         !isModifiedEvent(event) &&
//         !(href.includes("#") && targetPathname === pathname)
//       ) {
//         event.preventDefault();
//         navigate(href, pathname);
//       }
//     },
//     [navigate, pathname]
//   );

//   useEffect(() => {
//     if (!auto) return;

//     const controller = new AbortController();
//     delegate("a[href]", "click", handleClick as EventListener, {
//       signal: controller.signal,
//     });

//     return () => controller.abort();
//   }, [auto, handleClick]);

//   useEffect(() => {
//     if (stage === "entering") {
//       const runEnter = async () => {
//         try {
//           enterRef.current = (await Promise.resolve(
//             enter(() => {
//               setStage("none");
//               isSamePageRef.current = false;
//               completeLeaveRef.current = null;
//             })
//           )) as (() => void) | null;
//         } catch (error) {
//           console.error("Enter animation error:", error);
//           setStage("none");
//         }
//       };
//       runEnter();
//     }
//   }, [stage, enter]);

//   useEffect(() => {
//     return () => {
//       if (stage === "leaving" && !isSamePageRef.current) {
//         if (typeof leaveRef.current === "function") {
//           leaveRef.current();
//           leaveRef.current = null;
//         }
//         setStage("entering");
//       }
//     };
//   }, [stage, pathname]);

//   const value = useMemo<TransitionRouterContextType>(
//     () => ({
//       stage,
//       navigate,
//       isReady: stage !== "entering",
//     }),
//     [stage, navigate]
//   );

//   return jsx(TransitionRouterContext.Provider, {
//     value,
//     children,
//   });
// }

// export function useTransitionState(): TransitionRouterContextType {
//   return use(TransitionRouterContext);
// }

// export function useTransitionRouter(): ExtendedRouter {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { navigate } = useTransitionState();

//   const push = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "push", options);
//     },
//     [pathname, navigate]
//   );

//   const replace = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "replace", options);
//     },
//     [pathname, navigate]
//   );

//   const back = useCallback(() => {
//     navigate(pathname, "back");
//   }, [pathname, navigate]);

//   return useMemo(
//     () =>
//       _extends(router, {
//         push,
//         replace,
//         back,
//       }),
//     [router, push, replace, back]
//   );
// }

// export function Link(props: TransitionLinkProps): ReactElement {
//   const router = useTransitionRouter();
//   const { href, as, replace, scroll, onClick, ...restProps } = props;

//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLAnchorElement>) => {
//       if (onClick) onClick(e);

//       if (!e.defaultPrevented && !isModifiedEvent(e)) {
//         e.preventDefault();
//         const navigate = replace ? router.replace : router.push;
//         navigate(as || href, {
//           scroll: scroll ?? true,
//         });
//       }
//     },
//     [onClick, href, as, replace, scroll, router]
//   );
//   const mergedProps = Object.assign({}, restProps, {
//     href,
//     onClick: handleClick,
//   });
//   return jsx(NextLink, mergedProps);
// }

//refined version
// "use client";

// import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { UrlObject } from "url";
// import NextLink from "next/link";

// import {
//   ReactElement,
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import type { LinkProps } from "next/link";
// import delegate from "delegate-it";
// import { useRouter, usePathname } from "next/navigation";
// import { format } from "url";

// type Stage = "leaving" | "entering" | "none";
// type Url = string | UrlObject;
// type TransitionCallback = (
//   next: () => void,
//   from?: string,
//   to?: string
// ) => Promise<(() => void) | void> | ((() => void) | void);

// type NavigateProps = (
//   href: string,
//   pathname: string,
//   method?: "push" | "replace" | "back",
//   options?: NavigateOptions
// ) => void;

// interface TransitionRouterContextType {
//   stage: Stage;
//   navigate: NavigateProps;
//   isReady: boolean;
// }

// interface TransitionLinkProps extends LinkProps {
//   href: Url;
//   as?: Url;
//   replace?: boolean;
//   scroll?: boolean;
//   onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
//   children: React.ReactNode;
//   className?: string;
// }

// interface TransitionRouterProps {
//   children: ReactNode;
//   leave?: TransitionCallback;
//   enter?: TransitionCallback;
//   auto?: boolean;
// }

// interface DelegateEvent extends MouseEvent {
//   delegateTarget: HTMLElement;
// }
// const TransitionRouterContext = createContext<TransitionRouterContextType>({
//   stage: "none",
//   navigate: () => {},
//   isReady: false,
// });

// function isModifiedEvent(event: MouseEvent | React.MouseEvent): boolean {
//   const eventTarget =
//     "delegateTarget" in event
//       ? (event.delegateTarget as HTMLElement)
//       : (event.currentTarget as HTMLElement);

//   const target = eventTarget.getAttribute("target");

//   return (
//     (target && target !== "_self") ||
//     event.metaKey ||
//     event.ctrlKey ||
//     event.shiftKey ||
//     event.altKey ||
//     event.button === 1
//   );
// }

// function getUrlAsString(url: Url): string {
//   return typeof url === "string" ? url : format(url);
// }

// export function TransitionRouter({
//   children,
//   leave = async (next) => next(),
//   enter = async (next) => next(),
//   auto = false,
// }: TransitionRouterProps): ReactElement {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [stage, setStage] = useState<Stage>("none");
//   const leaveRef = useRef<(() => void) | null>(null);
//   const enterRef = useRef<(() => void) | null>(null);
//   const isSamePageRef = useRef<boolean>(false);
//   const completeLeaveRef = useRef<(() => void) | null>(null);

//   const navigate: NavigateProps = useCallback(
//     async (href, pathname, method = "push", options?) => {
//       if (typeof enterRef.current === "function") {
//         enterRef.current();
//         enterRef.current = null;
//       }

//       const isSamePage = href === pathname;
//       if (isSamePage) {
//         return;
//       }
//       isSamePageRef.current = isSamePage;

//       setStage("leaving");

//       const performNavigation = () => {
//         if (!isSamePage) {
//           router[method](href, options);
//           return Promise.resolve();
//         }
//         if (completeLeaveRef.current) {
//           completeLeaveRef.current();
//         }
//         return Promise.resolve();
//       };

//       try {
//         const leaveComplete = new Promise<void>((resolve) => {
//           completeLeaveRef.current = resolve;
//         });

//         leaveRef.current = (await leave(performNavigation, pathname, href)) as
//           | (() => void)
//           | null;

//         if (isSamePage) {
//           await leaveComplete;

//           if (typeof leaveRef.current === "function") {
//             leaveRef.current();
//             leaveRef.current = null;
//           }

//           setStage("entering");
//         }
//       } catch (error) {
//         console.error("Navigation error:", error);
//         setStage("none");
//       }
//     },
//     [leave, router]
//   );

//   const handleClick = useCallback(
//     (event: DelegateEvent) => {
//       const anchor = event.delegateTarget as HTMLAnchorElement;
//       const href = anchor?.getAttribute("href");
//       const ignore = anchor?.getAttribute("data-transition-ignore");
//       const url = href ? new URL(href, window.location.origin) : null;
//       const targetPathname = url?.pathname;

//       if (href === pathname) {
//         event.preventDefault();
//         return;
//       }

//       if (
//         !ignore &&
//         href?.startsWith("/") &&
//         anchor.target !== "_blank" &&
//         !isModifiedEvent(event) &&
//         !(href.includes("#") && targetPathname === pathname)
//       ) {
//         event.preventDefault();
//         navigate(href, pathname);
//       }
//     },
//     [navigate, pathname]
//   );

//   useEffect(() => {
//     if (!auto) return;

//     const controller = new AbortController();
//     delegate("a[href]", "click", handleClick, {
//       signal: controller.signal,
//     });

//     return () => controller.abort();
//   }, [auto, handleClick]);

//   useEffect(() => {
//     if (stage === "entering") {
//       const runEnter = async () => {
//         try {
//           enterRef.current = (await Promise.resolve(
//             enter(() => {
//               setStage("none");
//               isSamePageRef.current = false;
//               completeLeaveRef.current = null;
//             })
//           )) as (() => void) | null;
//         } catch (error) {
//           console.error("Enter animation error:", error);
//           setStage("none");
//         }
//       };
//       runEnter();
//     }
//   }, [stage, enter]);

//   useEffect(() => {
//     return () => {
//       if (stage === "leaving" && !isSamePageRef.current) {
//         if (typeof leaveRef.current === "function") {
//           leaveRef.current();
//           leaveRef.current = null;
//         }
//         setStage("entering");
//       }
//     };
//   }, [stage, pathname]);

//   const value = useMemo<TransitionRouterContextType>(
//     () => ({
//       stage,
//       navigate,
//       isReady: stage !== "entering",
//     }),
//     [stage, navigate]
//   );

//   return (
//     <TransitionRouterContext.Provider value={value}>
//       {children}
//     </TransitionRouterContext.Provider>
//   );
// }

// export function useTransitionState(): TransitionRouterContextType {
//   return useContext(TransitionRouterContext);
// }

// export function useTransitionRouter() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { navigate } = useTransitionState();

//   const push = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "push", options);
//     },
//     [pathname, navigate]
//   );

//   const replace = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "replace", options);
//     },
//     [pathname, navigate]
//   );

//   const back = useCallback(() => {
//     navigate(pathname, "back");
//   }, [pathname, navigate]);

//   return useMemo(
//     () => ({
//       ...router,
//       push,
//       replace,
//       back,
//     }),
//     [router, push, replace, back]
//   );
// }

// export function Link(props: TransitionLinkProps): ReactElement {
//   const router = useTransitionRouter();
//   const {
//     href,
//     as,
//     replace,
//     scroll,
//     onClick,
//     children,
//     className,
//     ...restProps
//   } = props;

//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLAnchorElement>) => {
//       if (onClick) onClick(e);

//       if (!e.defaultPrevented && !isModifiedEvent(e)) {
//         e.preventDefault();
//         const navigate = replace ? router.replace : router.push;
//         navigate(as || href, {
//           scroll: scroll ?? true,
//         });
//       }
//     },
//     [onClick, href, as, replace, scroll, router]
//   );

//   return (
//     <NextLink
//       {...restProps}
//       href={href}
//       onClick={handleClick}
//       className={className}
//     >
//       {children}
//     </NextLink>
//   );
// }

// next.js 15.1.4

// "use client";

// import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { UrlObject } from "url";
// import NextLink from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { format } from "url";
// import delegate from "delegate-it";

// import {
//   ReactElement,
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   useTransition,
// } from "react";
// import type { LinkProps } from "next/link";

// type Stage = "leaving" | "entering" | "none";
// type Url = string | UrlObject;
// type TransitionCallback = (
//   next: () => void,
//   from?: string,
//   to?: string
// ) => Promise<(() => void) | void> | ((() => void) | void);

// type NavigateProps = (
//   href: string,
//   pathname: string,
//   method?: "push" | "replace" | "back",
//   options?: NavigateOptions
// ) => void;

// interface TransitionRouterContextType {
//   stage: Stage;
//   navigate: NavigateProps;
//   isReady: boolean;
// }

// interface TransitionLinkProps extends Omit<LinkProps, "href"> {
//   href: Url;
//   as?: Url;
//   replace?: boolean;
//   scroll?: boolean;
//   onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
//   children: React.ReactNode;
//   className?: string;
// }

// interface TransitionRouterProps {
//   children: ReactNode;
//   leave?: TransitionCallback;
//   enter?: TransitionCallback;
//   auto?: boolean;
// }

// interface DelegateEvent extends MouseEvent {
//   delegateTarget: HTMLElement;
// }

// const TransitionRouterContext = createContext<TransitionRouterContextType>({
//   stage: "none",
//   navigate: () => {},
//   isReady: false,
// });

// const isModifiedEvent = (event: MouseEvent | React.MouseEvent): boolean => {
//   const eventTarget =
//     "delegateTarget" in event
//       ? (event as DelegateEvent).delegateTarget
//       : (event.currentTarget as HTMLElement);

//   const target = eventTarget.getAttribute("target");

//   return (
//     (target && target !== "_self") ||
//     event.metaKey ||
//     event.ctrlKey ||
//     event.shiftKey ||
//     event.altKey ||
//     event.button === 1
//   );
// };

// const getUrlAsString = (url: Url): string =>
//   typeof url === "string" ? url : format(url);

// export function TransitionRouter({
//   children,
//   leave = async (next) => next(),
//   enter = async (next) => next(),
//   auto = false,
// }: TransitionRouterProps): ReactElement {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [stage, setStage] = useState<Stage>("none");
//   const leaveRef = useRef<(() => void) | null>(null);
//   const enterRef = useRef<(() => void) | null>(null);
//   const isSamePageRef = useRef<boolean>(false);
//   const completeLeaveRef = useRef<(() => void) | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const navigate: NavigateProps = useCallback(
//     async (href, pathname, method = "push", options?) => {
//       if (typeof enterRef.current === "function") {
//         enterRef.current();
//         enterRef.current = null;
//       }

//       const isSamePage = href === pathname;
//       if (isSamePage) return;

//       isSamePageRef.current = isSamePage;

//       setStage("leaving");

//       const performNavigation = () => {
//         if (!isSamePage) {
//           startTransition(() => {
//             router[method](href, options);
//           });
//           return Promise.resolve();
//         }
//         if (completeLeaveRef.current) {
//           completeLeaveRef.current();
//         }
//         return Promise.resolve();
//       };

//       try {
//         const leaveComplete = new Promise<void>((resolve) => {
//           completeLeaveRef.current = resolve;
//         });

//         leaveRef.current = (await leave(performNavigation, pathname, href)) as
//           | (() => void)
//           | null;

//         if (isSamePage) {
//           await leaveComplete;

//           if (typeof leaveRef.current === "function") {
//             leaveRef.current();
//             leaveRef.current = null;
//           }

//           setStage("entering");
//         }
//       } catch (error) {
//         console.error("Navigation error:", error);
//         setStage("none");
//       }
//     },
//     [leave, router, startTransition]
//   );

//   const handleClick = useCallback(
//     (event: DelegateEvent) => {
//       const anchor = event.delegateTarget as HTMLAnchorElement;
//       const href = anchor?.getAttribute("href");
//       const ignore = anchor?.getAttribute("data-transition-ignore");
//       const url = href ? new URL(href, window.location.origin) : null;
//       const targetPathname = url?.pathname;

//       if (href === pathname) {
//         event.preventDefault();
//         return;
//       }

//       if (
//         !ignore &&
//         href?.startsWith("/") &&
//         anchor.target !== "_blank" &&
//         !isModifiedEvent(event) &&
//         !(href.includes("#") && targetPathname === pathname)
//       ) {
//         event.preventDefault();
//         navigate(href, pathname);
//       }
//     },
//     [navigate, pathname]
//   );

//   useEffect(() => {
//     if (!auto) return;

//     const controller = new AbortController();
//     delegate("a[href]", "click", handleClick, {
//       signal: controller.signal,
//     });

//     return () => controller.abort();
//   }, [auto, handleClick]);

//   useEffect(() => {
//     if (stage === "entering") {
//       const runEnter = async () => {
//         try {
//           enterRef.current = (await Promise.resolve(
//             enter(() => {
//               setStage("none");
//               isSamePageRef.current = false;
//               completeLeaveRef.current = null;
//             })
//           )) as (() => void) | null;
//         } catch (error) {
//           console.error("Enter animation error:", error);
//           setStage("none");
//         }
//       };
//       runEnter();
//     }
//   }, [stage, enter]);

//   useEffect(() => {
//     return () => {
//       if (stage === "leaving" && !isSamePageRef.current) {
//         if (typeof leaveRef.current === "function") {
//           leaveRef.current();
//           leaveRef.current = null;
//         }
//         setStage("entering");
//       }
//     };
//   }, [stage, pathname]);

//   const value = useMemo<TransitionRouterContextType>(
//     () => ({
//       stage,
//       navigate,
//       isReady: stage !== "entering" && !isPending,
//     }),
//     [stage, navigate, isPending]
//   );

//   return (
//     <TransitionRouterContext.Provider value={value}>
//       {children}
//     </TransitionRouterContext.Provider>
//   );
// }

// export const useTransitionState = (): TransitionRouterContextType =>
//   useContext(TransitionRouterContext);

// export const useTransitionRouter = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { navigate } = useTransitionState();

//   const push = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "push", options);
//     },
//     [pathname, navigate]
//   );

//   const replace = useCallback(
//     (href: Url, options?: NavigateOptions) => {
//       navigate(getUrlAsString(href), pathname, "replace", options);
//     },
//     [pathname, navigate]
//   );

//   const back = useCallback(() => {
//     navigate(pathname, "back");
//   }, [pathname, navigate]);

//   return useMemo(
//     () => ({
//       ...router,
//       push,
//       replace,
//       back,
//     }),
//     [router, push, replace, back]
//   );
// };

// export const Link = ({
//   href,
//   as,
//   replace,
//   scroll,
//   onClick,
//   children,
//   className,
//   ...restProps
// }: TransitionLinkProps): ReactElement => {
//   const router = useTransitionRouter();

//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLAnchorElement>) => {
//       if (onClick) onClick(e);

//       if (!e.defaultPrevented && !isModifiedEvent(e)) {
//         e.preventDefault();
//         const navigate = replace ? router.replace : router.push;
//         navigate(as || href, {
//           scroll: scroll ?? true,
//         });
//       }
//     },
//     [onClick, href, as, replace, scroll, router]
//   );

//   return (
//     <NextLink
//       {...restProps}
//       href={href}
//       onClick={handleClick}
//       className={className}
//     >
//       {children}
//     </NextLink>
//   );
// };

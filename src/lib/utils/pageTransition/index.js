"use client";
import { jsx } from "react/jsx-runtime";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  use,
  createContext,
} from "react";
import delegate from "delegate-it";
import { useRouter, usePathname } from "next/navigation";
import { format } from "url";
import NextLink from "next/link";

function isModifiedEvent(event) {
  const eventTarget =
    "delegateTarget" in event ? event.delegateTarget : event.currentTarget;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    ("which" in event ? event.which : event.nativeEvent.which) === 2 // middle mouse button
  );
}

const TransitionRouterContext = /*#__PURE__*/ createContext({
  stage: "none",
  navigate: () => {},
  isReady: false,
});

//Custom Version

function TransitionRouter({
  children,
  leave = async (next) => next(),
  enter = async (next) => next(),
  auto = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState("none");
  const leaveRef = useRef(null);
  const enterRef = useRef(null);

  // Keep track of whether this is a same-page transition
  const isSamePageRef = useRef(false);
  // Store the leave animation completion callback
  const completeLeaveRef = useRef(null);

  const navigate = useCallback(
    async (href, pathname, method = "push", options) => {
      // Reset state for new navigation
      if (typeof enterRef.current === "function") {
        enterRef.current();
        enterRef.current = null;
      }

      const isSamePage = href === pathname;
      if (isSamePage) {
        return;
      }
      isSamePageRef.current = isSamePage;

      setStage("leaving");

      const performNavigation = () => {
        if (!isSamePage) {
          return router[method](href, options);
        }
        // For same-page transitions, immediately complete the leave phase
        if (completeLeaveRef.current) {
          completeLeaveRef.current();
        }
        return Promise.resolve();
      };

      try {
        // Store the leave animation completion in ref for same-page transitions
        const leaveComplete = new Promise((resolve) => {
          completeLeaveRef.current = resolve;
        });

        leaveRef.current = await leave(performNavigation, pathname, href);

        if (isSamePage) {
          await leaveComplete;

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
    [leave, router]
  );

  const handleClick = useCallback(
    (event) => {
      const anchor = event.delegateTarget;
      const href = anchor?.getAttribute("href");
      const ignore = anchor?.getAttribute("data-transition-ignore");
      const url = href ? new URL(href, window.location.origin) : null;
      const targetPathname = url?.pathname;
      if (href === pathname) {
        event.preventDefault(); // Prevent any further navigation actions
        return; // Skip further processing
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
        try {
          enterRef.current = await Promise.resolve(
            enter(() => {
              setStage("none");
              isSamePageRef.current = false;
              completeLeaveRef.current = null;
            })
          );
        } catch (error) {
          console.error("Enter animation error:", error);
          setStage("none");
        }
      };
      runEnter();
    }
  }, [stage, enter]);

  useEffect(() => {
    return () => {
      if (stage === "leaving" && !isSamePageRef.current) {
        if (typeof leaveRef.current === "function") {
          leaveRef.current();
          leaveRef.current = null;
        }
        setStage("entering");
      }
    };
  }, [stage, pathname]);

  const value = useMemo(
    () => ({
      stage,
      navigate,
      isReady: stage !== "entering",
    }),
    [stage, navigate]
  );

  return jsx(TransitionRouterContext.Provider, {
    value,
    children,
  });
}

function useTransitionState() {
  return use(TransitionRouterContext);
}

function _extends$1() {
  _extends$1 =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends$1.apply(this, arguments);
}
function getUrlAsString(url) {
  if (typeof url === "string") return url;
  return format(url);
}
function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { navigate } = useTransitionState();
  const push = useCallback(
    (href, options) => {
      navigate(getUrlAsString(href), pathname, "push", options);
    },
    [pathname, navigate]
  );
  const replace = useCallback(
    (href, options) => {
      navigate(getUrlAsString(href), pathname, "replace", options);
    },
    [pathname, navigate]
  );
  const back = useCallback(() => {
    navigate(undefined, pathname, "back");
  }, [pathname, navigate]);
  return useMemo(
    () =>
      _extends$1({}, router, {
        push,
        replace,
        back,
      }),
    [router, push, replace, back]
  );
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}
function Link(props) {
  const router = useTransitionRouter();
  const { href, as, replace, scroll } = props;
  const onClick = useCallback(
    (e) => {
      if (props.onClick) props.onClick(e);
      if (!e.defaultPrevented && !isModifiedEvent(e)) {
        e.preventDefault();
        const navigate = replace ? router.replace : router.push;
        navigate(as || href, {
          scroll: scroll != null ? scroll : true,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onClick, href, as, replace, scroll]
  );
  return /*#__PURE__*/ jsx(
    NextLink,
    _extends({}, props, {
      onClick: onClick,
    })
  );
}

export { Link, TransitionRouter, useTransitionRouter, useTransitionState };

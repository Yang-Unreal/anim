import { useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransitionState } from "@/lib/hooks/useTransitionState";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Url } from "@/lib/type";
import { getUrlAsString } from "@/lib/constants/transition";

export const useTransitionRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { navigate } = useTransitionState();

  const push = useCallback(
    (href: Url, options?: NavigateOptions) => {
      navigate(getUrlAsString(href), pathname, "push", options);
    },
    [pathname, navigate]
  );

  const replace = useCallback(
    (href: Url, options?: NavigateOptions) => {
      navigate(getUrlAsString(href), pathname, "replace", options);
    },
    [pathname, navigate]
  );

  const back = useCallback(() => {
    navigate(pathname, "back");
  }, [pathname, navigate]);

  return useMemo(
    () => ({
      ...router,
      push,
      replace,
      back,
    }),
    [router, push, replace, back]
  );
};

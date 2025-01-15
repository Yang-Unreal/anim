import { useTransitionRouter } from "@/lib/hooks/useTransitionRouter";

import { useCallback } from "react";
import { isModifiedEvent } from "@/lib/utils/isModifiedEvent";
import NextLink from "next/link";
import { TransitionLinkProps } from "@/lib/type";

export const Link = ({
  href,
  as,
  replace,
  scroll,
  onClick,
  children,
  className,
  ...restProps
}: TransitionLinkProps) => {
  const router = useTransitionRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);

      if (!e.defaultPrevented && !isModifiedEvent(e)) {
        e.preventDefault();
        const navigate = replace ? router.replace : router.push;
        navigate(as || href, {
          scroll: scroll ?? true,
        });
      }
    },
    [onClick, href, as, replace, scroll, router]
  );

  return (
    <NextLink
      {...restProps}
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </NextLink>
  );
};

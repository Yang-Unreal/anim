import { DelegateEvent } from "delegate-it";
import type { MouseEvent as ReactMouseEvent } from "react";

export const isModifiedEvent = (
  event: DelegateEvent<MouseEvent> | ReactMouseEvent
): boolean => {
  const eventTarget = (
    "delegateTarget" in event ? event.delegateTarget : event.currentTarget
  ) as HTMLAnchorElement | SVGAElement;

  const target = eventTarget.getAttribute("target");

  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button === 1
  );
};

import { memo } from "react";
import { usePathname } from "next/navigation";
import type { Routes } from "@/lib/type";
import { ROUTES } from "@/lib/constants/animations";
import type { TransitionTextProps } from "@/lib/type";

export const TransitionText = memo(function TransitionText({
  textRef,
}: TransitionTextProps) {
  const pathname = usePathname();

  return (
    <p
      ref={textRef}
      className="text-[64px] font-semibold text-white absolute pointer-events-none left-[50%] top-[60%] z-3 transform -translate-x-[50%] -translate-y-[50%] opacity-0"
    >
      {ROUTES[pathname as keyof Routes]}
    </p>
  );
});

TransitionText.displayName = "TransitionText";

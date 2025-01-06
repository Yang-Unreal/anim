import { ButtonHTMLAttributes } from "react";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export function MenuButton({ isActive, ...props }: MenuButtonProps) {
  return (
    <div className="fixed right-0 z-10 p-8">
      <button
        {...props}
        className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-[#455ce9]"
      >
        <div
          className={`relative mx-auto w-2/5 before:bg-white after:bg-white
              before:absolute before:block before:h-[1px] before:w-full before:transition-all before:duration-300
              after:absolute after:block after:h-[1px] after:w-full after:transition-all after:duration-300
              ${
                isActive
                  ? "before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45"
                  : "before:translate-y-[5px] after:-translate-y-[5px]"
              }`}
        />
      </button>
    </div>
  );
}

import { NAVIGATION_ITEMS } from "@/lib/constants/nav";
import CustomLink from "@/components/header/nav/link/link";
import { NavContentProps } from "@/lib/type";

export default function NavContent({
  selectedIndicator,
  setSelectedIndicator,
  pathname,
}: NavContentProps) {
  return (
    <div
      onMouseLeave={() => setSelectedIndicator(pathname)}
      className="flex flex-col mt-20"
    >
      <div className="text-[11px] text-[#999999] uppercase border-b border-[#999999] mb-10">
        <p>Navigation</p>
      </div>
      <nav className="flex flex-col gap-3 text-[56px]">
        {NAVIGATION_ITEMS.map((data, index) => (
          <CustomLink
            key={data.href}
            data={{ ...data, index }}
            isActive={selectedIndicator === data.href}
            setSelectedIndicator={setSelectedIndicator}
          />
        ))}
      </nav>
    </div>
  );
}

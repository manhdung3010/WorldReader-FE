import React, { FC } from "react";

export interface DiscountProps {
  className?: string;
  per?: number;
  contentClass?: string;
}

const Discount: FC<DiscountProps> = ({
  className = "",
  per = 0,
  contentClass = "p-1 text-sm font-medium font-semibold ml-2",
}) => {
  if (!per) return null; // Không hiển thị nếu per = 0

  return (
    <div className={className}>
      <span
        className={`bg-[#C92127] text-white !leading-none rounded-[4px] ${contentClass}`}
      >
        -{per}%
      </span>
    </div>
  );
};

export default Discount;

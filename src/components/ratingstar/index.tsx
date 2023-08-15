import { StarFilled } from "@ant-design/icons";
import React, { useState } from "react";

// const ReactStars = require("react-rating-stars-component");

interface IProps {
  value: number;
  handleUpdateRating?: (value: number) => void;
  size?: number;
  className?: string;
}
export const ApRatingStar: React.FC<IProps> = ({
  value,
  handleUpdateRating,
  size = 20,
  className,
}) => {
  const [rate, setRate] = useState(value);

  const handleRating = (rateValue: number) => {
    if (handleUpdateRating) {
      handleUpdateRating(rateValue);
      setRate(rateValue);
    }
  };
  return (
    <>
      <div className={`flex gap-2 ${className}`}>
        <StarFilled
          className={rate >= 1 ? "text-orange-500" : "text-zinc-200"}
          size={size}
          onClick={() => {
            handleRating(1);
          }}
        />
        <StarFilled
          className={rate >= 2 ? "text-orange-500" : "text-zinc-200 "}
          size={size}
          onClick={() => {
            handleRating(2);
          }}
        />
        <StarFilled
          className={rate >= 3 ? "text-orange-500" : "text-zinc-200"}
          size={size}
          onClick={() => {
            handleRating(3);
          }}
        />
        <StarFilled
          className={rate >= 4 ? "text-orange-500" : "text-zinc-200"}
          size={size}
          onClick={() => {
            handleRating(4);
          }}
        />
        <StarFilled
          className={rate == 5 ? "text-orange-500" : "text-zinc-200 "}
          size={size}
          onClick={() => {
            handleRating(5);
          }}
        />
      </div>
    </>
  );
};

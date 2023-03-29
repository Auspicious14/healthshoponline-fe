import Image from "next/image";
import React from "react";

export const HomePage = () => {
  return (
    <>
      <div className="w-full h-56 bg-red-400">
        <Image
          src={"/public/images/Subtract.png"}
          width={200}
          priority
          height={200}
          alt={"img"}
        />
      </div>
    </>
  );
};

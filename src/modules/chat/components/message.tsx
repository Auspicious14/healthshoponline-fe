import Image from "next/image";
import React from "react";
import { IChat } from "../model";

interface IProps {
  message: IChat;
}
export const MessageComponent: React.FC<IProps> = ({ message }) => {
  return (
    <div>
      <div className=" ">
        <div className=" mb-6 flex items-start">
          {
            <Image
              src={"/user1.png"}
              width={31}
              height={31}
              alt="user-image"
              className=" rounded-full mr-4"
            />
          }
        </div>
        {
          <>
            {
              <div
                className={` mb-6 flex items-start gap-4 ${
                  message?.align == "right" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex p-6 bg-[#008440] rounded-[16px]  max-w-[381px]  relative flex-col">
                  <p
                    className=" font-normal
                pb-4
               text-base text-[#FFFFFF] leading-[27px]"
                  >
                    content
                  </p>
                  <small className=" text-right  font-normal leading-5 text-xs text-[white]">
                    {new Date().toLocaleTimeString()}
                  </small>
                </div>
                <Image
                  src={"/user1.png"}
                  width={31}
                  height={31}
                  alt="user-image"
                  className=" rounded-full mr-4"
                />
              </div>
            }
          </>
        }
      </div>
    </div>
  );
};

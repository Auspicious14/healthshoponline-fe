import Image from "next/image";
import React from "react";
import { IChat } from "../model";

interface IProps {
  message: IChat;
}
export const MessageComponent: React.FC<IProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-4 ${
        message?.align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        src={"/user1.png"}
        width={31}
        height={31}
        alt="user-image"
        className="rounded-full"
      />
      <div
        className={`p-4 rounded-2xl max-w-[70%] ${
          message?.align === "right" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p className="text-base leading-5">{message.message}</p>
        <small className="block text-xs mt-2 text-right">
          {new Date(message.createdAt).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
};

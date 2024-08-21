import React, { useEffect } from "react";
import { useChatState } from "./context";
import { io, Socket } from "socket.io-client";
import { MessageComponent } from "./components/message";

export const ChatPage = () => {
  const { messages, loading, getMessages } = useChatState();

  const socket: Socket = io(`${process.env.NEXT_PUBLIC_API_ROUTE}`);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("new_message", (data) => {
      console.log(data);
    });

    socket.on("messages", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, [socket]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="fixed top-40 right-0 w-1/2 h-full rounded-2xl bg-red-400 p-8">
      <div className="flex justify-between items-end">
        <div className="rounded-lg bg-slate-200 p-4 w-1/2">
          <p>Hello</p>
        </div>
        {messages?.map((message) => (
          <MessageComponent message={message} key={message?._id} />
        ))}
      </div>
    </div>
  );
};

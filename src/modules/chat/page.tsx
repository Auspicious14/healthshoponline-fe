import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "./context";
import { io, Socket } from "socket.io-client";
import { MessageComponent } from "./components/message";
import { ApTextInput } from "../../components";
import { CloseCircleFilled, SendOutlined } from "@ant-design/icons";
import { IChat } from "./model";

interface IProps {
  storeId: string;
  userId: string;
  onDissmiss: () => void;
}
export const ChatPage: React.FC<IProps> = ({ storeId, userId, onDissmiss }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const socket = io(`${process.env.NEXT_PUBLIC_API_ROUTE}`);

  useEffect(() => {
    console.log("useEffect is firing");

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log(socket, "socket connected");
    });

    socket.on("connect_error", (err) => {
      console.log(err, "error");
      socket.connect();
    });
    socket.emit("chats", (chats: any) => {
      console.log(chats, "chats");
    });

    socket.on("all_messages", (data: any) => {
      console.log(data, "all message");
      setMessages(data);
    });

    socket.on("new_message", (message: any) => {
      console.log(message, "new message");
      setMessages([...messages, message]);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [messages]);

  const handleSendMessage = (message: string) => {
    const payload = {
      message,
      storeId,
      userId,
      senderId: userId,
    };
    if (socketRef.current) {
      socketRef.current.emit("send_message", payload);
      setMessage("");
    } else {
      console.log("No socket Instance");
    }
  };

  return (
    <div className="fixed top-20 bottom-0 right-0 w-full sm:w-1/2 lg:w-1/3 rounded-2xl bg-white p-4 shadow-lg flex flex-col justify-between">
      <div className="flex justify-end">
        <button
          className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full"
          onClick={() => onDissmiss()}
        >
          <CloseCircleFilled />
        </button>
      </div>
      <div className="overflow-y-auto mb-4 space-y-4">
        {messages?.map((message) => (
          <MessageComponent message={message} key={message?._id} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <input
          name="new_message"
          type="text"
          placeholder="Type your message"
          className="flex-grow px-4 py-2 outline-none border border-gray-300 rounded-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full"
          onClick={() => handleSendMessage(message)}
        >
          <SendOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
};

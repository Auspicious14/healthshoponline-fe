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
  user: { id: string | null; isAdmin: boolean };
  onDissmiss: () => void;
}
export const ChatPage: React.FC<IProps> = ({ storeId, userId, onDissmiss }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_ROUTE}`);
    socketRef.current = socket;

    const role = userId ? "user" : "store";
    const senderId = userId || storeId;

    socket.on("connect", () => {
      console.log(socket.id, "socket connected");
      socket.emit("register_client", { senderId, role });
    });

    socket.on("connect_error", (err) => {
      socket.connect();
    });

    socket.emit("chats", { storeId, userId });

    socket.on("all_messages", (data: IChat[]) => {
      setMessages(data);
    });

    // socket.on("new_message", (message: IChat) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (message: string, senderRole: 'user' | 'store') => {
    const senderId = senderRole === 'user' ? userId : storeId;
    const payload = {
      message,
      storeId,
      userId,
      senderId,
    };
    if (socketRef.current) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...payload, align: "right" },
      ]);
      socketRef.current.emit("send_message", payload);
      setMessage("");
    } else {
      console.log("No socket Instance");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed top-20 bottom-0 right-0 w-full sm:w-1/2 lg:w-1/3 rounded-2xl bg-white p-4 shadow-lg flex flex-col justify-between z-50">
      <div className="flex justify-end">
        <button
          className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full"
          onClick={() => onDissmiss()}
        >
          <CloseCircleFilled />
        </button>
      </div>
      <div ref={chatContainerRef} className="overflow-y-auto mb-4 space-y-4">
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
          onClick={() => handleSendMessage(message, 'user')}
        >
          <SendOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
};

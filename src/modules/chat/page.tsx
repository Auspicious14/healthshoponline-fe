import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "./context";
import { io, Socket } from "socket.io-client";
import { MessageComponent } from "./components/message";
import { ApTextInput } from "../../components";
import {
  CloseCircleFilled,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { IChat, IFile } from "./model";
import { Upload, UploadFile } from "antd";
import { fileSvc } from "../../file";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  storeId: string;
  userId: string;
  user?: { id: string | null; isAdmin: boolean };
  onDissmiss: () => void;
}
export const ChatPage: React.FC<IProps> = ({ storeId, userId, onDissmiss }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_ROUTE}`);
    socketRef.current = socket;

    const senderId = userId;

    socket.on("connect", () => {
      console.log(socket.id, "socket connected");
      socket.emit("register_client", { senderId, role: "user" });
    });

    socket.on("connect_error", (err) => {
      socket.connect();
    });

    socket.emit("chats", { storeId, userId });

    socket.on("user_store_messages", (data: IChat[]) => {
      setMessages(data);
    });

    socket.on("new_message", (message: IChat) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message: string, senderRole: "user" | "store") => {
    const senderId = senderRole === "user" ? userId : storeId;
    const payload = {
      message,
      storeId,
      userId,
      senderId,
      files,
    };
    if (socketRef.current) {
      if (message !== "" || files.length > 0) {
        setMessages(
          (prevMessages) =>
            [
              ...prevMessages,
              { ...payload, images: files, align: "right" },
            ] as IChat[]
        );
        socketRef.current.emit("send_message", payload);
        setMessage("");
        setFiles([]);
      } else {
        return toast.error("Invalid text");
      }
    } else {
      console.log("No socket Instance");
    }
  };

  const handleFileUpload = async (fileList: UploadFile<any>[]) => {
    const fls: IFile[] = await Promise.all(
      fileList.map(async (f) => ({
        name: f.name,
        uri: await fileSvc.fileToBase64(f.originFileObj as any),
        type: f.type as string,
      }))
    );
    setFiles(fls);
  };

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
      {messages?.length === 0 && (
        <div className="flex justify-center items-center my-auto">
          <p className="italic">Say something</p>
        </div>
      )}
      <div ref={chatContainerRef} className="overflow-y-auto mb-4 space-y-4">
        {messages?.map((message) => (
          <MessageComponent message={message} key={message?._id} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Upload
          name="avatar"
          listType="text"
          className="avatar-uploader"
          showUploadList={false}
          multiple
          onChange={({ fileList }) => handleFileUpload(fileList)}
          rootClassName="w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <PlusCircleIcon fontSize={10} className="w-7 h-7" />
        </Upload>
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
          onClick={() => handleSendMessage(message, "user")}
        >
          <SendOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { IChat } from "./model";

interface IChatState {
  loading: boolean;
  messages: IChat[];
  setMessages: (category: IChat[]) => void;
  getMessages: (query?: any) => Promise<void>;
}

const ChatContext = React.createContext<IChatState>({
  loading: false,
  messages: [],
  setMessages(category) {},
  getMessages() {
    return null as any;
  },
});

export const useChatState = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ChatContextProvider: React.FC<IProps> = ({ children }) => {
  const [messages, setMessages] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMessages = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/chat`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setMessages(data.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        loading,
        messages,
        getMessages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

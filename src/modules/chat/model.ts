export interface IChat {
  _id?: string;
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
  images: IFile[];
  align?: "left" | "right";
  createdAt?: string;
  updatedAt?: string;
}

export interface IChatPayload {
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
}

export interface IUserMessageStore {
  _id?: string;
  messages?: IChat[];
  read?: boolean;
  unreadMessagesCount: number;
  lastMessage: {
    message: string;
    createdAt: string;
  };
  unreadMessagesFromStore: number;
  unreadMessagesFromUser: number;
  user?: {
    firstName: string;
    lastName: string;
  };
}

export interface IFile {
  uri: string;
  name: string;
  type: string;
}

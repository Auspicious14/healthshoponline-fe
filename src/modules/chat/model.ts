export interface IChat {
  _id: string;
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
  align: "left" | "right";
  createdAt: string;
  updatedAt: string;
}

export interface IChatPayload {
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
}

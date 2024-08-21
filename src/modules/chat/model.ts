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

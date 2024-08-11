import { ICart } from "../cart/model";

export interface IOrder {
  _id: string;
  userId: string;
  cart: ICart[];
  amount: number;
  address: IAddress;
  status: IOrderStatus;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string;
}

export enum IOrderStatus {
  new = "new",
  pending = "pending",
  confirmed = "confirmed",
  packed = "packed",
  shipped = "shipped",
}

export interface IAddress {
  name: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  address: string;
}

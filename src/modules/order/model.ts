import { ICart } from "../cart/model";

export interface IOrder {
  id: string;
  userId: string;
  cart: ICart;
  amount: number;
  address: IAddress;
  status: IOrderStatus;
}

export enum IOrderStatus {
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

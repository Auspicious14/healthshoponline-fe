import { IProduct } from "../product/model";

export interface IOrder {
  userId: string;
  products: IProduct[];
  amount: string;
  address: string;
  status: IOrderStatus;
}

export enum IOrderStatus {
  pending = "pending",
  confirmed = "confirmed",
  packed = "packed",
  shipped = "shipped",
}

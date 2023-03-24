export interface IProduct {
  id: string;
  name: string;
  description: string;
  images?: [string];
  price: number;
  size: string;
  categories: [string];
  color: string;
  quantity: string;
}

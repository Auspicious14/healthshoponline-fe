export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: IProductImage[];
  price: number;
  size: string;
  categories: [string];
  color: string;
  quantity: number;
}

export interface IProductImage {
  _id: string;
  uri: string;
  name?: string;
  type?: string;
}

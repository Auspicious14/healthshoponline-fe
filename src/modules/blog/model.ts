import { IStore } from "../store/model";

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  author: IStore;
  createdAt: string;
  updatedAt: string;
  images: IBlogImage[];
}

export interface IBlogImage {
  _id?: string;
  uri: string;
  type: string;
  name: string;
}

export interface IBlogFilter {
  category: string;
  new: string;
  storeId: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  images: ICategoryImage[];
}

export interface ICategoryImage {
  uri: string;
  name: string;
  type: string;
}

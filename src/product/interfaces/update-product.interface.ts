import { ICategory } from "../../category/interfaces/category.interface";

export interface IUpdateProduct {
  name?: string;

  brand?: string;

  sku?: string;

  category?: ICategory;

  description?: string;

  price?: number;

  countInStock?: number;
}

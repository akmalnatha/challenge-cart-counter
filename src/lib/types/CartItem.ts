import { Product } from "./Product";

export interface CartItem extends Omit<Product, "id"> {
  productId: number;
  quantity: number;
}

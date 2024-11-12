import { CartItem } from "./CartItem";

export interface CartInterface {
  userId: number;
  date?: string;
  products: CartItem[];
}

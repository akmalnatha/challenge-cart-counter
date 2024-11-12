interface CartItem extends Omit<Product, "id"> {
  productId: number;
  quantity: number;
}

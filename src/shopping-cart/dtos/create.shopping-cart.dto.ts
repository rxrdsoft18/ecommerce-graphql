export class CreateShoppingCartDto {
  userId: string;
  totalPrice: number;
  items: ShoppingCartItem[];
}

export class ShoppingCartItem {
  productId: string;

  name: string;

  quantity: number;

  price: number;

  subTotalPrice: number;
}

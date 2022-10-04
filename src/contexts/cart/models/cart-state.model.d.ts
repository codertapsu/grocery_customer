import { CartItem } from './cart-item.model';

export interface CartState {
  items: CartItem[];
  totalPrice: number;
}

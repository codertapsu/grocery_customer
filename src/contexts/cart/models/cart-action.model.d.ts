import { CartActionType } from './cart-action-type.model';
import { CartItem } from './cart-item.model';

export type CartAction =
  | {
      type: CartActionType.AddProduct;
      data: CartItem;
    }
  | {
      type: CartActionType.RemoveProduct;
      data: CartItem;
    }
  | {
      type: CartActionType.Reset;
    };

import { Product } from '@models/product.model';

import { WishlistActionType } from './wishlist-action-type.model';

export type WishlistAction =
  | {
      type: WishlistActionType.Add;
      data: Product;
    }
  | {
      type: WishlistActionType.Remove;
      data: Product;
    }
  | {
      type: WishlistActionType.Open;
    }
  | {
      type: WishlistActionType.Close;
    }
  | {
      type: WishlistActionType.Reset;
    };

import { WishlistActionType } from './models/wishlist-action-type.model';
import { WishlistAction } from './models/wishlist-action.model';
import { WishlistState } from './models/wishlist-state.model';

export const wishlistInitialState: WishlistState = {
  products: [],
  isOpen: false,
};

export const wishlistReducer = (state: WishlistState, action: WishlistAction) => {
  switch (action.type) {
    case WishlistActionType.Add: {
      const existingCartItem = state.products.find((item) => item.id === action.data.id);
      if (existingCartItem) {
        return state;
      }
      return {
        ...state,
        products: [...state.products, action.data],
      };
    }
    case WishlistActionType.Remove: {
      const products = state.products.filter((item) => item.id !== action.data.id);
      return { ...state, products };
    }
    case WishlistActionType.Open: {
      return { ...state, isOpen: true };
    }
    case WishlistActionType.Close: {
      return { ...state, isOpen: false };
    }
    case WishlistActionType.Reset: {
      return wishlistInitialState;
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

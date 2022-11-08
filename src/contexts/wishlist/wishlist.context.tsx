import { createContext, useReducer } from 'react';

import { Product } from '@models/product.model';

import { WishlistActionType } from './models/wishlist-action-type.model';
import { WishlistState } from './models/wishlist-state.model';
import { wishlistInitialState, wishlistReducer } from './wishlist.reducer';

interface Context extends WishlistState {
  add: (data: Product) => void;
  remove: (data: Product) => void;
  reset: () => void;
  open: () => void;
  close: () => void;
}

export const WishlistContext = createContext<Context>(null);

export const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ products, isOpen }, dispatch] = useReducer(wishlistReducer, wishlistInitialState);

  const add = (data: Product) => {
    dispatch({ type: WishlistActionType.Add, data });
  };

  const remove = (data: Product) => {
    dispatch({ type: WishlistActionType.Remove, data });
  };

  const reset = () => {
    dispatch({ type: WishlistActionType.Reset });
  };

  const open = () => {
    dispatch({ type: WishlistActionType.Open });
  };

  const close = () => {
    dispatch({ type: WishlistActionType.Close });
  };

  const value = { add, remove, reset, open, close, products, isOpen };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

import { createContext, useCallback, useReducer } from 'react';

import { cartInitialState, cartReducer } from './cart.reducer';
import { CartActionType } from './models/cart-action-type.model';
import { CartItem } from './models/cart-item.model';
import { CartState } from './models/cart-state.model';

interface Context extends CartState {
  addProduct: (item: CartItem) => void;
  removeProduct: (item: CartItem) => void;
}

export const CartContext = createContext<Context>(null);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addProduct = useCallback((data: CartItem) => {
    dispatch({ type: CartActionType.AddProduct, data });
  }, []);

  const removeProduct = useCallback((data: CartItem) => {
    dispatch({ type: CartActionType.RemoveProduct, data });
  }, []);

  // const value = useMemo(
  //   () => ({ addProduct, removeProduct, items: state.items, totalPrice: state.totalPrice }),
  //   [state],
  // );

  const value = { addProduct, removeProduct, items: state.items, totalPrice: state.totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

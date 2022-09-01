import { createContext, useMemo, useReducer } from 'react';

import { CartAction } from '@models/cart-action.model';
import { CartState } from '@models/cart-state.model';
import { cartReducer } from '@reducers/cart.reducer';

type Dispatch = (action: CartAction) => void;
type CartProviderProps = { readonly children: React.ReactNode };

export const CartStateContext = createContext<{ state: CartState; dispatch: Dispatch } | undefined>(undefined);

const initialState: CartState = { products: [], totalPrice: 0, isOpen: false };

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>;
};

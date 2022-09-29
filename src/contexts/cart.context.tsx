import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react';

import { CartAction } from '@models/cart-action.model';
import { CartState } from '@models/cart-state.model';
import { cartReducer } from '@reducers/cart.reducer';
// import { useBroadcastChannel } from '@hooks/use-broadcast-channel';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { CART_CHANNEL } from '@constants/channels.constant';

export const CartStateContext = createContext<{ state: CartState; dispatch: Dispatch<CartAction> } | undefined>(
  undefined,
);

const initialState: CartState = { products: [], totalPrice: 0, isOpen: false };

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // const cartChannel = useBroadcastChannel<any>(CART_CHANNEL);

  // useIsomorphicLayoutEffect(() => {
  //   cartChannel.onmessage = (payload) => {
  //     console.log(payload);
      
  //     // switch (data.type) {
  //     //   case 'READY': {
  //     //     break;
  //     //   }
  //     //   case 'START': {
  //     //     break;
  //     //   }
  //     //   case 'SYNC': {
  //     //     break;
  //     //   }
  //     //   default: {
  //     //     break;
  //     //   }
  //     // }
  //   };

  //   return () => {
  //     cartChannel.close().then(() => {
  //       //
  //     });
  //   };
  // }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>;
};

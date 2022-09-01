import { CartStateContext } from '@contexts/cart.context';
import { useMemo, useContext } from "react";


export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return useMemo(() => context, [context]);
};

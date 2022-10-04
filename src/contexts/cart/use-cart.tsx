import { useMemo, useContext } from 'react';
import { CartContext } from './cart.context';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return useMemo(() => context, [context]);
};

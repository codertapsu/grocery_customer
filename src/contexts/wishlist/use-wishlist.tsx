import { useContext } from 'react';

import { WishlistContext } from './wishlist.context';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistContext.Provider');
  }
  return context;
};

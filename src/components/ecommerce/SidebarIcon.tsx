import { useSelector } from 'react-redux';

import { StoreState, useReduxStore } from '@contexts/redux-store';

export const SideBarIcons = () => {
  const totalCartItems = useSelector<StoreState, number>((state) => state.cart.length);
  const totalCompareItems = useSelector<StoreState, number>((state) => state.compare.items.length);
  const totalWishlistItems = useSelector<StoreState, number>((state) => state.wishlist.items.length);

  const { openCompareModal, openWishlistModal, openCart } = useReduxStore();

  return (
    <>
      <div className='right-sidebar-popup-btn'>
        <div className='popup-btn cart' onClick={openCart}>
          Cart
          <span> {totalCartItems}</span>
        </div>
        <div className='popup-btn wishlist' onClick={openWishlistModal}>
          Wishlist
          <span> {totalWishlistItems}</span>
        </div>

        <div className='popup-btn compare' onClick={openCompareModal} style={{ top: '60%' }}>
          compare
          <span> {totalCompareItems}</span>
        </div>
      </div>
    </>
  );
};


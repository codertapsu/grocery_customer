import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Types from '@contexts/redux-store/constants/actionTypes';
import storage from '@contexts/redux-store/util/localStorage';

export const StorageWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const saveStoredItems = (storedItems) => {
    dispatch({
      type: Types.INIT_LOCALSTORAGE,
      payload: { ...storedItems },
    });
  };

  useEffect(() => {
    const cart = storage.get('dokani_cart') || [];
    const wishlist = storage.get('dokani_wishlist') || [];
    const compare = storage.get('dokani_compare') || [];

    saveStoredItems({ cart, wishlist, compare });
  }, []);

  return <>{children}</>;
};

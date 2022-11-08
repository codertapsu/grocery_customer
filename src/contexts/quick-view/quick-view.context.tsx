import React, { createContext, useReducer } from 'react';

import { Product } from '@models/product.model';

import { QuickViewActionType } from './models/quick-view-action-type.model';
import { quickViewInitialState, quickViewReducer } from './quick-view.reducer';

interface Context {
  product: Product;
  open: (value: Product) => void;
  close: () => void;
}

export const QuickViewContext = createContext<Context>(null);

export const QuickViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ product }, dispatch] = useReducer(quickViewReducer, quickViewInitialState);

  const open = (data: Product) => {
    dispatch({ type: QuickViewActionType.Open, data });
  };

  const close = () => {
    dispatch({ type: QuickViewActionType.Close });
  };

  const value: Context = {
    open,
    close,
    product,
  };

  return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
};

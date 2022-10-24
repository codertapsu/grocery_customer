import { combineReducers } from 'redux';

import { StoreState } from '../models/store-state.model';
import { cartReducer } from './cart';
import { compareReducer } from './compare';
import { productsReducer } from './product';
import { productFiltersReducer } from './productFilters';
import { quickViewReducer } from './quickView';
import { wishlistReducer } from './wishlist';

export const rootReducer = combineReducers<StoreState>({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  quickView: quickViewReducer,
  compare: compareReducer,
  productFilters: productFiltersReducer,
});

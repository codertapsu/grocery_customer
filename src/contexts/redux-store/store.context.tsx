import React, { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '@models/product.model';

import * as Types from './constants/actionTypes';
import { ProductFilter } from './models/product-filter.model';
import filterProductList from './util/filterProduct';
import searchItemsByText from './util/searchItemsByText';

interface Context {
  // cart
  addToCart: (product: Product) => void;
  deleteFromCart: (productId: any) => void;
  increaseQuantity: (productId: any) => void;
  decreaseQuantity: (productId: any) => void;
  openCart: () => void;
  clearCart: () => void;
  closeCart: () => void;
  // compare
  openCompareModal: (e: any) => void;
  closeCompareModal: (e: any) => void;
  addToCompare: (product: any) => void;
  deleteFromCompare: (productId: any) => void;
  clearCompare: () => void;
  // product
  fetchProduct: (searchTerm: string, url: string, filters: any) => Promise<void>;
  fetchMoreProduct: (url: any, total: any) => Promise<void>;
  fetchByCategory: (url: any, filters: any) => Promise<Product[]>;
  // product filter
  updateProductFilters: (productFilters: ProductFilter) => void;
  updateProductCategory: (category: any) => void;
  updateProductRating: (rating: any) => void;
  // quick view
  openQuickView: (product: any) => void;
  closeQuickView: () => void;
  // wishlist
  openWishlistModal: () => void;
  closeWishlistModal: () => void;
  addToWishlist: (product: any) => void;
  deleteFromWishlist: (productId: any) => void;
  clearWishlist: () => void;
}

export const ReduxStoreContext = createContext<Context>(null);

export const ReduxStoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const addToCart = (product: Product) => {
    dispatch({
      type: Types.ADD_TO_CART,
      payload: { product },
    });
  };

  const deleteFromCart = (productId) => {
    dispatch({
      type: Types.DELETE_FROM_CART,
      payload: { productId },
    });
  };

  const increaseQuantity = (productId) => {
    dispatch({
      type: Types.INCREASE_QUANTITY,
      payload: { productId },
    });
  };

  const decreaseQuantity = (productId) => {
    dispatch({
      type: Types.DECREASE_QUANTITY,
      payload: { productId },
    });
  };

  const openCart = () => {
    dispatch({
      type: Types.OPEN_CART,
    });
  };

  const clearCart = () => {
    dispatch({
      type: Types.CLEAR_CART,
    });
  };

  const closeCart = () => {
    dispatch({
      type: Types.CLOSE_CART,
    });
  };

  const openCompareModal = (e) => {
    dispatch({
      type: Types.OPEN_COMPARE,
    });
  };

  const closeCompareModal = (e) => {
    dispatch({
      type: Types.CLOSE_COMPARE,
    });
  };

  const addToCompare = (product) => {
    dispatch({
      type: Types.ADD_TO_COMPARE,
      payload: { product },
    });
  };

  const deleteFromCompare = (productId) => {
    dispatch({
      type: Types.DELETE_FROM_COMPARE,
      payload: { productId },
    });
  };

  const clearCompare = () => {
    dispatch({
      type: Types.CLEAR_COMPARE,
    });
  };

  const fetchProduct = async (searchTerm: string, url: string, filters) => {
    try {
      const sendRequest = await fetch(url);
      const data: Product[] = await sendRequest.json();
      const searchedItems = searchItemsByText(searchTerm, data);
      const filteredList = filterProductList(searchedItems, filters);
      dispatch({
        type: Types.FETCHED_PRODUCT,
        payload: { products: filteredList },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreProduct = async (url, total) => {
    try {
      const sendRequest = await fetch(url);
      const data = await sendRequest.json();

      // const searchedItems = searchItemsByText(searchTerm,data)
      // const filteredList  = filterProductList(searchedItems,filters)

      dispatch({
        type: Types.FETCHED_MORE_PRODUCT,
        payload: { products: data, total },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByCategory = async (url, filters) => {
    try {
      const sendRequest = await fetch(url);
      const data = await sendRequest.json();
      const filteredList = filterProductList(data, filters);

      return filteredList;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductFilters = (productFilters: ProductFilter) => {
    dispatch({
      type: Types.UPDATE_PRODUCT_FILTERS,
      payload: { productFilters },
    });
  };

  const updateProductCategory = (category) => {
    dispatch({
      type: Types.UPDATE_PRODUCT_CATEGORY,
      payload: { category },
    });
  };

  const updateProductRating = (rating) => {
    console.log(rating);
    dispatch({
      type: Types.UPDATE_RATING,
      payload: rating,
    });
  };

  const openQuickView = (product) => {
    dispatch({
      type: Types.OPEN_QUICK_VIEW,
      payload: { product },
    });
  };

  const closeQuickView = () => {
    dispatch({
      type: Types.CLOSE_QUICK_VIEW,
    });
  };

  const openWishlistModal = () => {
    dispatch({
      type: Types.OPEN_WISHLIST,
    });
  };

  const closeWishlistModal = () => {
    dispatch({
      type: Types.CLOSE_WISHLIST,
    });
  };

  const addToWishlist = (product) => {
    dispatch({
      type: Types.ADD_TO_WISHLIST,
      payload: { product },
    });
  };

  const deleteFromWishlist = (productId) => {
    dispatch({
      type: Types.DELETE_FROM_WISHLIST,
      payload: { productId },
    });
  };

  const clearWishlist = () => {
    dispatch({
      type: Types.CLEAR_WISHLIST,
    });
  };

  const value = useMemo(
    () => ({
      // cart
      addToCart,
      deleteFromCart,
      increaseQuantity,
      decreaseQuantity,
      openCart,
      clearCart,
      closeCart,
      // compare
      openCompareModal,
      closeCompareModal,
      addToCompare,
      deleteFromCompare,
      clearCompare,
      // product
      fetchProduct,
      fetchMoreProduct,
      fetchByCategory,
      // product filter
      updateProductFilters,
      updateProductCategory,
      updateProductRating,
      // quick view
      openQuickView,
      closeQuickView,
      // wishlist
      openWishlistModal,
      closeWishlistModal,
      addToWishlist,
      deleteFromWishlist,
      clearWishlist,
    }),
    [dispatch],
  );

  return <ReduxStoreContext.Provider value={value}>{children}</ReduxStoreContext.Provider>;
};

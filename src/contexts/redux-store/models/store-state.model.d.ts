export interface StoreState {
  products: any;
  cart: any[];
  wishlist: {
    modal: boolean;
    items: any[];
  };
  quickView: any;
  compare: {
    modal: boolean;
    items: any[];
  };
  productFilters: any;
}

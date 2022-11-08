import { Product } from '@models/product.model';

export interface WishlistState {
  products: Product[];
  isOpen: boolean;
}

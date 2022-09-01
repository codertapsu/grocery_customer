import { Product } from './product.model';

export interface CartState {
   products: Array<Product>;
   totalPrice: number;
   isOpen: boolean;
};

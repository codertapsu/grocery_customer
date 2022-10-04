import { Product } from './product.model';

export interface CartItem {
   product: Product;
   quantity: number;
}

export interface CartState {
   items: CartItem[];
   totalPrice: number;
   isOpen: boolean;
};

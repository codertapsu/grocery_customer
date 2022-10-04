import { Product } from '@models/product.model';

export interface CartItem {
  quantity: number;
  product: Product;
}

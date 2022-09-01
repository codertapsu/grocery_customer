import { Product } from './product.model';

export type CartAction =
  | { type: 'addProduct'; payload: Product }
  | { type: 'deleteProduct'; payload: Product }
  | { type: 'openMenu' }
  | { type: 'closeMenu' };

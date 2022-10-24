export interface ProductFilter {
  color?: any[];
  condition?: any[];
  sizes?: any[];
  tags?: any[];
  vendor?: any[];
  featured?: string;
  category?: string;
  price?: {
    min: number;
    max: number;
  };
}

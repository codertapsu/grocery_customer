export interface Product {
  id: number;
  name: string;
  slug: string;
  currentPrice: number;
  previousPrice: number;
  reviews: { content: string; id: number }[];
  isNew: boolean;
  isTop: boolean;
  isSale: boolean;
  images: string[];
  variants: { id: number; name: string }[];
  categories: { id: number; name: string; slug: string }[];
}

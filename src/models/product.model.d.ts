export interface SeoMeta {
  title: string;
  description: string;
}

export interface Vat {
  title: string;
  description: string;
}

export interface Tag {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  slug: string;
  description: string;
  seoMeta: SeoMeta;
}

export interface Label {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  status: string;
  backgroundColor: string;
}

export interface Media {
  id: string;
  path: string;
  mimetype: string;
}

export interface Category {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  slug: string;
  description: string;
  status: string;
  isFeatured: boolean;
  backgroundColor: string;
  seoMeta: SeoMeta;
  icon?: Media;
  image?: Media;
}

export interface Currency {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  code: string;
  symbol: string;
  rounding: number;
  decimalDigits: number;
}

export interface Product {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  content: string;
  description: string;
  isFeatured: boolean;
  isTopRated: boolean;
  isTopSelling: boolean;
  isTrendingProduct: boolean;
  promotionalPrice: number;
  regularPrice: number;
  seoMeta: SeoMeta;
  faqs: any[];
  sku: string;
  slug: string;
  status: string;
  stock: number;
  vat: Vat;
  tags: Tag[];
  labels: Label[];
  medias: Media[];
  thumbnail: string;
  qrImage: string;
  categories: Category[];
  currency: Currency;
  reviews: any[];
  ratingScore: number;
}

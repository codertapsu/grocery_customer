import { FC, useEffect, useState } from 'react';

import Link from 'next/link';

import { useReduxStore } from '@contexts/redux-store';

import { Product } from '../../models/product.model';
import NextImage from 'next/image';

interface Props {
  products?: Product[];
}

export const BestSellerSlider: FC<Props> = ({ products }: Props) => {
  const placeholderImg = '/assets/imgs/thumbnail.jpg';
  return (
    <>
      {products.slice(0, 3).map((product, i) => (
        <article key={product.id} className='row align-items-center hover-up'>
          <figure className='col-md-4 mb-0'>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <NextImage
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                src={product.thumbnail || placeholderImg}
                alt=''
              />
            </Link>
          </figure>
          <div className='col-md-8 mb-0'>
            <h6>
              <Link href='/products/[slug]' as={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h6>
            <div className='product-rate-cover'>
              <div className='product-rate d-inline-block'>
                <div className='product-rating' style={{ width: '90%' }}></div>
              </div>
              <span className='font-small text-muted ml-5'> (4.0)</span>
            </div>
            <div className='product-price'>
              <span>${product.promotionalPrice} </span>
              <span className='old-price'>{product.regularPrice && `$ ${product.regularPrice}`}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

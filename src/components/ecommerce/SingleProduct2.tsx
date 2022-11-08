import { FC } from 'react';
import { toast } from 'react-toastify';

import NextImage from 'next/image';
import Link from 'next/link';

import { useQuickView } from '@contexts/quick-view';
import { useReduxStore } from '@contexts/redux-store';
import { Product } from '@models/product.model';

interface Props {
  product: Product;
}

export const SingleProduct2: FC<Props> = ({ product }) => {
  const { open } = useQuickView();
  const { addToCart, addToCompare, addToWishlist } = useReduxStore();

  const handleCart = (product) => {
    addToCart(product);
    toast('Product added to Cart !');
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast('Added to Compare list !');
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast('Added to Wishlist !');
  };

  const placeholderImg = '/assets/imgs/product-holder.jpg';

  return (
    <>
      <div className='product-cart-wrap mb-30'>
        <div className='product-img-action-wrap'>
          <div className='product-img product-img-zoom'>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <NextImage
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                className='default-img'
                src={(product.medias?.length && product.medias[0]?.path) || placeholderImg}
                alt=''
              />
              <NextImage
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                className='hover-img'
                src={(product.medias?.length && product.medias[1]?.path) || placeholderImg}
                alt=''
              />
            </Link>
          </div>
          <div className='product-action-1'>
            <a
              aria-label='Quick view'
              className='action-btn hover-up'
              data-bs-toggle='modal'
              // data-bs-target="#quickViewModal"
              onClick={(e) => open(product)}
            >
              <i className='fi-rs-eye'></i>
            </a>
            <a aria-label='Add To Wishlist' className='action-btn hover-up' onClick={(e) => handleWishlist(product)}>
              <i className='fi-rs-heart'></i>
            </a>
            <a aria-label='Compare' className='action-btn hover-up' onClick={(e) => handleCompare(product)}>
              <i className='fi-rs-shuffle'></i>
            </a>
          </div>

          <div className='product-badges product-badges-position product-badges-mrg'>
            <span className='hot'>Hot</span>
            <span className='new'>New</span>
            <span className='best'>Best Sell</span>
            <span className='sale'>Sale</span>
            <span className='hot'>{10}%</span>
          </div>
        </div>
        <div className='product-content-wrap'>
          <div className='product-category'>
            <Link href='/products'>{'product.brand'}</Link>
          </div>
          <h2>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h2>

          <div className='product-rate d-inline-block'>
            <div className='product-rating' style={{ width: '90%' }}></div>
          </div>

          <div className='product-price mt-10'>
            <span>${product.promotionalPrice} </span>
            <span className='old-price'>{product.regularPrice && `$ ${product.regularPrice}`}</span>
          </div>
          <div className='sold mt-15 mb-15'>
            <div className='progress mb-5'>
              <div className='progress-bar' role='progressbar' style={{ width: '50%' }}></div>
            </div>
            <span className='font-xs text-heading'> Sold: 90/120</span>
          </div>

          <a className='btn w-100 hover-up' onClick={(e) => handleCart(product)}>
            <i className='fi-rs-shopping-cart mr-5'></i> Add To Cart
          </a>
        </div>
      </div>
    </>
  );
};

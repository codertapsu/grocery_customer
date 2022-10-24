import { toast } from 'react-toastify';

import Image from 'next/future/image';
import Link from 'next/link';

import { useReduxStore } from '@contexts/redux-store';
import { Product } from '@models/product.model';
import { FC } from 'react';

interface Props {
  product: Product;
}

export const SingleProduct: FC<Props> = ({ product }) => {
  const { addToCart, addToCompare, addToWishlist, openQuickView } = useReduxStore();

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
  return (
    <>
      <div className='product-cart-wrap mb-30'>
        <div className='product-img-action-wrap'>
          <div className='product-img product-img-zoom'>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <a>
                Holder
                {/* <Image
                  width='0'
                  height='0'
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                  className='default-img'
                  src={product.medias[0].path}
                  alt=''
                />
                <Image
                  width='0'
                  height='0'
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                  className='hover-img'
                  src={product.medias[1].path}
                  alt=''
                /> */}
              </a>
            </Link>
          </div>
          <div className='product-action-1'>
            <a aria-label='Add To Wishlist' className='action-btn hover-up' onClick={(e) => handleWishlist(product)}>
              <i className='fi-rs-heart' />
            </a>
            <a aria-label='Compare' className='action-btn hover-up' onClick={(e) => handleCompare(product)}>
              <i className='fi-rs-shuffle' />
            </a>
            <a aria-label='Quick view' className='action-btn hover-up' onClick={(e) => openQuickView(product)}>
              <i className='fi-rs-eye' />
            </a>
          </div>
          <div className='product-badges product-badges-position product-badges-mrg'>
            {/* {product.trending && <span className='hot'>Hot</span>}
            {product.created && <span className='new'>New</span>}
            {product.totalSell > 100 && <span className='best'>Best Sell</span>}
            {product.discount.isActive && <span className='sale'>Sale</span>}
            {product.discount.percentage >= 5 && <span className='hot'>{product.discount.percentage}%</span>} */}
          </div>
        </div>
        <div className='product-content-wrap'>
          <div className='product-category'>
            <Link href='/products'>
              Holder
              {/* <a>{product.brand}</a> */}
            </Link>
          </div>
          <h2>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <a>{product.name}</a>
            </Link>
          </h2>
          <div className='product-rate-cover'>
            <div className='product-rate d-inline-block'>
              <div className='product-rating' style={{ width: '90%' }} />
            </div>
            <span className='font-small text-muted ml-5'> ({product.ratingScore || 5.5})</span>
          </div>
          <div>
            <span className='font-small text-muted'>
              By{' '}
              <Link href='/vendor/1'>
                <a>NestFood</a>
              </Link>
            </span>
          </div>
          <div className='product-card-bottom'>
            <div className='product-price'>
              <span>${product.promotionalPrice} </span>
              <span className='old-price'>{product.regularPrice && `$ ${product.regularPrice}`}</span>
            </div>
            <div className='add-cart'>
              <a className='add' onClick={(e) => handleCart(product)}>
                <i className='fi-rs-shopping-cart mr-5'></i> Add
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='product-cart-wrap mb-30'>
        <div className='product-img-action-wrap'>
          <div className='product-img product-img-zoom'>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <a>
                <img className='default-img' src={product.medias[0].path} alt='' />
                <img className='hover-img' src={product.medias[1].path} alt='' />
              </a>
            </Link>
          </div>
          <div className='product-action-1'>
            <a
              aria-label='Quick view'
              className='action-btn hover-up'
              data-bs-toggle='modal'
              onClick={(e) => openQuickView(product)}
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
            {product.trending && <span className='hot'>Hot</span>}
            {product.created && <span className='new'>New</span>}
            {product.totalSell > 100 && <span className='best'>Best Sell</span>}
            {product.discount.isActive && <span className='sale'>Sale</span>}
            {product.discount.percentage >= 5 && <span className='hot'>{product.discount.percentage}%</span>}
          </div>
        </div>
        <div className='product-content-wrap'>
          <div className='product-category'>
            <Link href='/products'>
              <a>{product.brand}</a>
            </Link>
          </div>
          <h2>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <a>{product.title}</a>
            </Link>
          </h2>

          <div className='product-rate-cover'>
            <div className='product-rate d-inline-block'>
              <div className='product-rating' style={{ width: '90%' }}></div>
            </div>
            <span className='font-small ml-5 text-muted'> ({product.ratingScore})</span>
          </div>

          <div>
            <span className='font-small text-muted'>
              By{' '}
              <Link href='/vendor/1'>
                <a>NestFood</a>
              </Link>
            </span>
          </div>

          <div className='product-card-bottom'>
            <div className='product-price'>
              <span>${product.price} </span>
              <span className='old-price'>{product.oldPrice && `$ ${product.oldPrice}`}</span>
            </div>
            <div className='add-cart'>
              <a className='add' onClick={(e) => handleCart(product)}>
                <i className='fi-rs-shopping-cart mr-5'></i> Add
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
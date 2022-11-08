import { toast } from 'react-toastify';

import Link from 'next/link';

import { useReduxStore } from '@contexts/redux-store';
import { Timer } from './Timer';
import NextImage from 'next/image';

export const Deals1 = ({ product }) => {
  const { addToCart } = useReduxStore();
  const handleCart = (product) => {
    addToCart(product);
    toast('Product added to Cart !');
  };

  const placeholderImg = '/assets/imgs/product-holder.jpg';

  return (
    <>
      <div className='product-cart-wrap style-2'>
        <div className='product-img-action-wrap'>
          <div className='product-img'>
            <Link href='/products'>
              <NextImage
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                src={product.discount.banner || placeholderImg}
                alt=''
              />
            </Link>
          </div>
        </div>
        <div className='product-content-wrap'>
          <div className='deals-countdown-wrap'>
            <Timer endDateTime='2022-11-27 00:00:00' />
          </div>
          <div className='deals-content'>
            <h2>
              <Link href='/products/[slug]' as={`/products/${product.slug}`}>
                {product.title}
              </Link>
            </h2>
            <div className='product-rate-cover'>
              <div className='product-rate d-inline-block'>
                <div className='product-rating' style={{ width: '90%' }}></div>
              </div>
              <span className='font-small text-muted ml-5'> (4.0)</span>
            </div>
            <div>
              <span className='font-small text-muted'>
                By <Link href='/vendor/1'>NestFood</Link>
              </span>
            </div>
            <div className='product-card-bottom'>
              <div className='product-price'>
                <span>${product.price}</span>
                <span className='old-price'>{product.oldPrice && `$ ${product.oldPrice}`}</span>
              </div>
              <div className='add-cart'>
                <a className='add' onClick={(e) => handleCart(product)}>
                  <i className='fi-rs-shopping-cart mr-5'></i>Add{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

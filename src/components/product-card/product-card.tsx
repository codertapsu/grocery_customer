import { Image } from '@components/image';
import { Overlay } from '@components/overlay';
import { ProductCountdown } from '@components/product-countdown';
import { QuickView } from '@components/quick-view';
import { useCart } from '@contexts/cart';
import { useState } from 'react';

export const ProductCard = () => {
  const [isOpenQuickView, setIsOpenQuickView] = useState(false);
  const {} = useCart();
  return (
    <>
      <Overlay showModal={isOpenQuickView} setShowModal={setIsOpenQuickView}>
        <QuickView />
      </Overlay>
      <div className='product'>
        <div className='product-media'>
          <span className='product-label label-new'>New</span>
          <span className='product-label label-top'>Top</span>
          <span className='product-label label-sale'>Sale</span>
          <Image
            src='/assets/images/demos/demo-13/products/product-2.jpg'
            alt='Product image'
            className='product-image'
          />
          <ProductCountdown countTo={new Date('Jan 5, 2024 15:37:25')} />
          <div className='product-action-vertical'>
            <span role='button' className='btn-product-icon btn-wishlist btn-expandable'>
              <span>add to wishlist</span>
            </span>
            <span role='button' className='btn-product-icon btn-compare' title='Compare'>
              <span>Compare</span>
            </span>
            <span
              role='button'
              className='btn-product-icon btn-quickview btn-expandable'
              title='Quick view'
              onClick={() => setIsOpenQuickView(true)}
            >
              <span>Quick view</span>
            </span>
          </div>
          <div className='product-action'>
            <button
              type='button'
              className='btn-product btn-cart'
              title='Add to cart'
              onClick={() => {
                //
              }}
            >
              <span>add to cart</span>
            </button>
          </div>
        </div>
        <div className='product-body'>
          <div className='product-cat'>
            <a href='#'>Electronics</a>
          </div>
          <h3 className='product-title'>
            <a href='product.html'>Bose - SoundSport wireless headphones</a>
          </h3>
          <div className='product-price'>
            <span className='new-price'>$179.99</span>
            <span className='old-price'>Was $199.99</span>
          </div>
          <div className='ratings-container'>
            <div className='ratings'>
              <div className='ratings-val' style={{ width: '100%' }} />
            </div>
            <span className='ratings-text'>( 4 Reviews )</span>
          </div>
          <div className='product-nav product-nav-dots'>
            <a href='#' className='active' style={{ background: '#69b4ff' }}>
              <span className='visually-hidden'>Color name</span>
            </a>
            <a href='#' style={{ background: '#ff887f' }}>
              <span className='visually-hidden'>Color name</span>
            </a>
            <a href='#' style={{ background: '#333333' }}>
              <span className='visually-hidden'>Color name</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

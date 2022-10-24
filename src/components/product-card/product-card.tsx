import { Image } from '@components/image';
import { NumberFormatter } from '@components/number-formatter';
import { Overlay } from '@components/overlay';
import { ProductCountdown } from '@components/product-countdown';
import { QuickView } from '@components/quick-view';
import { useCart } from '@contexts/cart';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { Product } from '@models/product.model';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [isOpenQuickView, setIsOpenQuickView] = useState(false);
  const {} = useCart();
  return (
    <>
      <Overlay showModal={isOpenQuickView} setShowModal={setIsOpenQuickView}>
        <QuickView />
      </Overlay>
      <div className={mergeClassNames('product', styles['product'])}>
        <div className='product-media'>
          {/* {product.isNew && <span className='product-label label-new'>New</span>}
          {product.isTop && <span className='product-label label-top'>Top</span>}
          {product.isSale && <span className='product-label label-sale'>Sale</span>} */}
          <Image
            src='/assets/images/demos/demo-13/products/product-2.jpg'
            alt='Product image'
            className='product-image'
          />
          <ProductCountdown countTo={new Date('Jan 5, 2024 15:37:25')} />
          <div className={mergeClassNames('product-action-vertical', styles['product-action-vertical'])}>
            <span
              role='button'
              className={mergeClassNames(
                'btn-product-icon btn-expandable btn-wishlist',
                styles['btn-product-icon'],
                styles['btn-expandable'],
              )}
            >
              <span>add to wishlist</span>
            </span>
            {/* <span role='button' className='btn-product-icon btn-compare' title='Compare'>
              <span>Compare</span>
            </span> */}
            <span
              role='button'
              className={mergeClassNames(
                'btn-product-icon btn-expandable btn-quickview',
                styles['btn-product-icon'],
                styles['btn-expandable'],
              )}
              title='Quick view'
              onClick={() => setIsOpenQuickView(true)}
            >
              <span>Quick view</span>
            </span>
          </div>
          <div className={mergeClassNames('product-action', styles['product-action'])}>
            <button
              type='button'
              className={mergeClassNames('btn-product btn-cart', styles['btn-product'])}
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
            {product.categories.map((cat, index) => {
              const isLast = index === product.categories.length - 1;

              return (
                <Fragment key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`}>
                    <a>{cat.name}</a>
                  </Link>
                  {!isLast && <>{', '}</>}
                </Fragment>
              );
            })}
          </div>
          <h3 className='product-title'>
            <Link href={`/products/${product.slug}`}>
              <a>{product.name}</a>
            </Link>
          </h3>
          <div className='product-price'>
            <span className='new-price'>
              <NumberFormatter style='currency' value={product.promotionalPrice} />
            </span>
            <span className='old-price'>
              Was <NumberFormatter style='currency' value={product.regularPrice} />
            </span>
          </div>
          <div className='ratings-container'>
            <div className='ratings'>
              <div className='ratings-val' style={{ width: '100%' }} />
            </div>
            <span className='ratings-text'>( {product.reviews.length} Reviews )</span>
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

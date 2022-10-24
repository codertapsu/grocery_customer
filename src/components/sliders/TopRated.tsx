import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { useReduxStore } from '@contexts/redux-store';

SwiperCore.use([Navigation]);

export const TopRatedSlider = () => {
  const [discount, setDiscount] = useState([]);
  const { fetchByCategory } = useReduxStore();

  const fetchProducts = async () => {
    // With Category
    const allProducts = await fetchByCategory('/static/product.json', {});

    // Discount
    const discountProduct = allProducts;

    setDiscount(discountProduct);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {discount.slice(0, 3).map((product, i) => (
        <article className='row align-items-center hover-up' key={i}>
          <figure className='col-md-4 mb-0'>
            <Link href='/products/[slug]' as={`/products/${product.slug}`}>
              <a>
                Holder
                {/* <img src={product.medias[0].path} alt='' /> */}
              </a>
            </Link>
          </figure>
          <div className='col-md-8 mb-0'>
            <h6>
              <Link href='/products/[slug]' as={`/products/${product.slug}`}>
                <a>{product.title}</a>
              </Link>
            </h6>
            <div className='product-rate-cover'>
              <div className='product-rate d-inline-block'>
                <div className='product-rating' style={{ width: '90%' }}></div>
              </div>
              <span className='font-small ml-5 text-muted'> (4.0)</span>
            </div>
            <div className='product-price'>
              <span>${product.price} </span>
              <span className='old-price'>{product.oldPrice && `$ ${product.oldPrice}`}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

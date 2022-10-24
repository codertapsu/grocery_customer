import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useReduxStore } from '@contexts/redux-store';

export const TrendingSlider = () => {
  const [trending, setTrending] = useState([]);
  const { fetchByCategory } = useReduxStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // With Category
    const allProducts = await fetchByCategory('/static/product.json', {});

    const trendingItem = allProducts.filter((item) => item.isTrendingProduct);
    setTrending(trendingItem);
  };

  return (
    <>
      {trending.slice(0, 3).map((product, i) => (
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

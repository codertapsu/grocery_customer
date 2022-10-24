import { useEffect, useState } from 'react';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useReduxStore } from '@contexts/redux-store';

import { Product } from '../../models/product.model';
import { SingleProduct } from '../ecommerce/SingleProduct';

SwiperCore.use([Navigation]);

interface Props {
  products: Product[];
}

export const DiscountSlider = ({ products }: Props) => {
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
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        navigation={{
          prevEl: '.custom_prev_d',
          nextEl: '.custom_next_d',
        }}
        className='custom-class'
      >
        {discount.map((product, i) => (
          <SwiperSlide key={i}>
            <SingleProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='custom-nav'>
        <button type='button' className='custom_prev_d'>
          Prev
        </button>
        <button type='button' className='custom_next_d'>
          Next
        </button>
      </div>
    </>
  );
};

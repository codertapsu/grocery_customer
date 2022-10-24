import { useEffect, useState } from 'react';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useReduxStore } from '@contexts/redux-store';

import { Product } from '../../models/product.model';
import { SingleProduct } from '../ecommerce/SingleProduct';

SwiperCore.use([Navigation]);

interface Props {
  products?: Product[];
}

export const RelatedSlider = ({ products }: Props) => {
  const [related, setRelated] = useState([]);
  const { fetchByCategory } = useReduxStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // With Category
    const allProducts = await fetchByCategory('/static/product.json', {});
    setRelated(allProducts);
  };

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          prevEl: '.custom_prev_n',
          nextEl: '.custom_next_n',
        }}
        className='custom-class'
      >
        {related.map((product, i) => (
          <SwiperSlide key={i}>
            <SingleProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='slider-arrow slider-arrow-2 carausel-6-columns-arrow'>
        <span className='slider-btn slider-prev slick-arrow custom_prev_n'>
          <i className='fi-rs-angle-left'></i>
        </span>
        <span className='slider-btn slider-next slick-arrow custom_next_n'>
          <i className='fi-rs-angle-right'></i>
        </span>
      </div>
    </>
  );
};

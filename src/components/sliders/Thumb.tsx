import 'swiper/css/thumbs';

import { FC, useState } from 'react';
import NextImage from 'next/image';

import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '@models/product.model';

interface Props {
  product: Product;
}

SwiperCore.use([Navigation, Thumbs]);

export const ThumbSlider: FC<Props> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>(null);

  return (
    <>
      <div className='product-image-slider'>
        <Swiper
          style={
            {
              '--swiper-navigation-color': '#3bb77e',
              '--swiper-pagination-color': '#fff',
            } as any
          }
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className='mySwiper2'
        >
          {product.medias.map((item, index) => (
            <SwiperSlide key={index}>
              <NextImage
                width='0'
                height='0'
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                src={item.path}
                alt=''
              />
              {/* <Zoom
                    img={item.thumb}
                    zoomScale={5}
                    width={500}
                    height={500}
                    ransitionTime={0.5}
                /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className='mySwiper'
      >
        {product.medias.map((item, index) => (
          <SwiperSlide key={index}>
            <NextImage
              width='0'
              height='0'
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
              src={item.path}
              alt=''
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

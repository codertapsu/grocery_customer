import 'swiper/css/thumbs';

import { useState } from 'react';

import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// style={{
//   '--swiper-navigation-color': '#fff',
//   '--swiper-pagination-color': '#fff',
// }}

SwiperCore.use([Navigation, Thumbs]);

export const ThumbSlider = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>(null);

  return (
    <>
      <div>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className='mySwiper2'
        >
          {product.gallery.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.thumb} />
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
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className='mySwiper'
        >
          {product.gallery.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.thumb} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>{`
        .mySwiper2 {
          --swiper-navigation-color: #fff;
          --swiper-pagination-color: #fff;
        }
      `}</style>
    </>
  );
};

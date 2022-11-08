import { FC } from 'react';

import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr/immutable';

import { useReduxStore } from '@contexts/redux-store';
import { Category } from '@models/category.model';

SwiperCore.use([Navigation, Autoplay]);

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) =>
      ((r.data as any[]) || []).map(
        (item) =>
          ({
            id: item.id,
            image: item.image,
            thumbnail: item.thumbnail,
            name: item.name,
            slug: item.url,
            backgroundColor: item.background_color,
            productCount: item.products_count_text,
          } as Category),
      ),
    );

export const CategorySlider: FC = () => {
  const { updateProductCategory } = useReduxStore();
  const router = useRouter();
  const { data, error } = useSWR('/static/categories.json', fetcher);

  const selectCategory = (e, category) => {
    e.preventDefault();
    // removeSearchTerm();
    updateProductCategory(category);
    router.push({
      pathname: '/products',
      query: {
        cat: category, //
      },
    });
  };

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Swiper
        autoplay={true}
        navigation={{
          prevEl: '.custom_prev_ct1',
          nextEl: '.custom_next_ct1',
        }}
        className='custom-class'
        slidesPerView={2.5}
        breakpoints={{
          480: {
            slidesPerView: 2.5,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 8,
          },
          1200: {
            slidesPerView: 10,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              data-wow-delay={`${index * 0.1}s`}
              className={`card-2 wow animate__animated animate__fadeInUp`}
              style={{
                backgroundColor: item.backgroundColor,
              }}
              onClick={(e) => selectCategory(e, item.slug)}
            >
              <figure className=' img-hover-scale overflow-hidden'>
                <Link href={''}>
                  <NextImage
                    width='0'
                    height='0'
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto' }}
                    src={item.thumbnail}
                    alt=''
                  />
                </Link>
              </figure>
              <h6 className='text-truncate px-2'>
                <Link href={''}>{item.name}</Link>
              </h6>
              <span>{item.productCount}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow' id='carausel-10-columns-arrows'>
        <span className='slider-btn slider-prev slick-arrow custom_prev_ct1'>
          <i className='fi-rs-arrow-small-left'></i>
        </span>
        <span className='slider-btn slider-next slick-arrow custom_next_ct1'>
          <i className='fi-rs-arrow-small-right'></i>
        </span>
      </div>
    </>
  );
};

// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// SwiperCore.use([Navigation]);

// const CategorySlider = () => {
//     return (
//         <>
//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//
//                 navigation={{
//                     prevEl: ".custom_prev",
//                     nextEl: ".custom_next",
//                 }}
//                 className="custom-class"
//             >
//                 <SwiperSlide>1</SwiperSlide>
//                 <SwiperSlide>2</SwiperSlide>
//                 <SwiperSlide>3</SwiperSlide>
//             </Swiper>

//             <div className="custom-nav">
//                 <button type="button" className="custom_prev">
//                     Prev
//                 </button>
//                 <button type="button" className="custom_next">
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

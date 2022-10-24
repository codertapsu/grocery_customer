import Image from 'next/future/image';
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useReduxStore } from '@contexts/redux-store';

const bgColors = () => {
  const colors = [
    '#fddde4',
    '#cdebbc',
    '#d1e8f2',
    '#cdd4f8',
    '#f6dbf6',
    '#fff2e5',
    '#d77f7a',
    '#63a2c1',
    '#f2fce4',
    '#fffceb',
    '#ecffec',
    '#feefea',
    '#fff3eb',
    '#fff3ff',
    '#f2fce4',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

SwiperCore.use([Navigation, Autoplay]);
const data = [
  {
    id: 1,
    title: 'Cake & Milk',
    slug: 'jeans',
    img: 'cat-13.png',
    bg: 'bg-9',
  },
  {
    id: 2,
    title: 'Oganic Kiwi',
    slug: 'shoe',
    img: 'cat-12.png',
    bg: 'bg-10',
  },
  {
    id: 3,
    title: 'Peach',
    slug: 'jacket',
    img: 'cat-11.png',
    bg: 'bg-11',
  },
  {
    id: 4,
    title: 'Red Apple',
    img: 'cat-9.png',
    bg: 'bg-12',
  },
  {
    id: 5,
    title: 'Snack',
    img: 'cat-3.png',
    bg: 'bg-13',
  },
  {
    id: 6,
    title: 'Vegetables',
    img: 'cat-1.png',
    bg: 'bg-14',
  },
  {
    id: 7,
    title: 'Strawberry',
    img: 'cat-2.png',
    bg: 'bg-15',
  },
  {
    id: 8,
    title: 'Black plum',
    img: 'cat-4.png',
    bg: 'bg-12',
  },
  {
    id: 9,
    title: 'Custard apple',
    img: 'cat-5.png',
    bg: 'bg-10',
  },
  {
    id: 10,
    title: 'Coffe & Tea',
    img: 'cat-14.png',
    bg: 'bg-12',
  },
  {
    id: 11,
    title: 'Headphone',
    img: 'cat-15.png',
    bg: 'bg-11',
  },
];
export const CategorySlider = () => {
  const { updateProductCategory } = useReduxStore();
  const router = useRouter();

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

  return (
    <>
      <Swiper
        autoplay={true}
        navigation={{
          prevEl: '.custom_prev_ct1',
          nextEl: '.custom_next_ct1',
        }}
        className='custom-class'
        breakpoints={{
          480: {
            slidesPerView: 2,
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
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div>
              <div
                data-wow-delay={0}
                className='card-2 wow animate__animated animate__fadeInUp'
                style={{
                  backgroundColor: '#fddde4',
                }}
                onClick={(e) => selectCategory(e, item.slug)}
              >
                <figure className=' img-hover-scale overflow-hidden'>
                  <a>
                    <Image
                      width='0'
                      height='0'
                      sizes='100vw'
                      style={{ width: '100%', height: 'auto' }}
                      src={`/assets/imgs/shop/${item.img}`}
                      alt=''
                    />
                  </a>
                </figure>
                <h6>
                  <a>{item.title}</a>
                </h6>
                <span>26 items</span>
              </div>
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


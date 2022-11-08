import Link from 'next/link';
import { BestSellerSlider } from '../sliders/BestSeller';
import { TrendingSlider } from '../sliders/Trending2';
import { NewArrival2 } from '../sliders/NewArrival2';
import { TopRatedSlider } from '../sliders/TopRated';
import { FC } from 'react';
import useSWR from 'swr/immutable';
import { Product } from '@models/product.model';

interface Product2 {
  id: number;
  name: string;
  url: string;
  image: string;
  price: string;
  sale_price: string;
  reviews_avg: number;
  reviews_count: number;
}

interface GroupProduct {
  title: string;
  products: Product2[];
}

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) =>
      (r.data as GroupProduct[]).map((g) => ({
        title: g.title,
        products: (g.products || []).map(
          (i) =>
            ({
              id: i.id,
              name: i.name,
              promotionalPrice: 100,
              regularPrice: 120,
              slug: i.url,
              thumbnail: i.image,
              reviews: Array.from({ length: i.reviews_count }).fill(''),
              ratingScore: i.reviews_avg,
            } as Product),
        ),
      })),
    );

export const Bottom: FC = () => {
  const { data, error } = useSWR('/static/top-products-group.json', fetcher);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <section className='section-padding mb-30'>
        <div className='container'>
          <div className='row'>
            {data.map((group, index) => (
              <div
                key={index}
                className='col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 wow animate__animated animate__fadeInUp'
                data-wow-delay={`${index * 0.1}s`}
              >
                <h4 className='section-title style-1 mb-30  animated animated'>{group.title}</h4>
                <div className='product-list-small  animated animated'>
                  <BestSellerSlider products={group.products} />
                </div>
              </div>
            ))}
            {/* <div
              className='col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 wow animate__animated animate__fadeInUp'
              data-wow-delay='0'
            >
              <h4 className='section-title style-1 mb-30  animated animated'>Top Selling</h4>
              <div className='product-list-small  animated animated'>
                <BestSellerSlider />
              </div>
            </div>
            <div
              className='col-xl-3 col-lg-4 col-md-6 mb-md-0 wow animate__animated animate__fadeInUp'
              data-wow-delay='.1s'
            >
              <h4 className='section-title style-1 mb-30  animated animated'>Trending Products</h4>
              <div className='product-list-small  animated animated'>
                <TrendingSlider />
              </div>
            </div>
            <div
              className='col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-lg-block wow animate__animated animate__fadeInUp'
              data-wow-delay='.2s'
            >
              <h4 className='section-title style-1 mb-30  animated animated'>Recently added</h4>
              <div className='product-list-small  animated animated'>
                <NewArrival2 />
              </div>
            </div>
            <div
              className='col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-xl-block wow animate__animated animate__fadeInUp'
              data-wow-delay='.3s'
            >
              <h4 className='section-title style-1 mb-30  animated animated'>Top Rated</h4>
              <div className='product-list-small  animated animated'>
                <TopRatedSlider />
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

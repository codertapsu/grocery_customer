import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Product } from '@models/product.model';

import { FeaturedSlider } from '../sliders/Featured';
import { NewArrivalTabSlider } from '../sliders/NewArrivalTab';
import { TrendingSlider } from '../sliders/Trending';
import useSWR from 'swr/immutable';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) =>
      ((r.data as any[]) || []).map(
        (i) =>
          ({
            id: i.id,
            name: i.name,
            promotionalPrice: i.sale_price,
            regularPrice: i.price,
            slug: i.url,
            medias: [
              {
                path: i.image,
              },
              {
                path: i.hover_image,
              },
            ],
            reviews: Array.from({ length: i.reviews.count }).fill(''),
            ratingScore: i.reviews.abg,
          } as Product),
      ),
    );

export const FetchTabSlider: React.FC = () => {
  const [products, setProducts] = useState<{
    featured: Product[];
    trending: Product[];
    newArrival: Product[];
  }>({
    featured: [],
    trending: [],
    newArrival: [],
  });
  const { data, error } = useSWR('/static/products.json', fetcher);

  const [active, setActive] = useState<number>(1);
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onTabChange = (index: number) => {
    refreshData();
    setActive(index);
  };

  useEffect(() => {
    setActive(1);
  }, []);

  useEffect(() => {
    setProducts({
      featured: data,
      trending: data,
      newArrival: data,
    });
  }, [data]);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className='section-title wow animate__animated animate__fadeIn'>
        <h3 className=''>Daily Best Sells</h3>

        <ul className='nav nav-tabs links' id='myTab-1' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button className={active === 1 ? 'nav-link active' : 'nav-link'} onClick={() => onTabChange(1)}>
              Featured
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button className={active === 2 ? 'nav-link active' : 'nav-link'} onClick={() => onTabChange(2)}>
              Popular
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button className={active === 3 ? 'nav-link active' : 'nav-link'} onClick={() => onTabChange(3)}>
              New added
            </button>
          </li>
        </ul>
      </div>

      <div className='row'>
        <div className='col-lg-3 d-none d-lg-flex wow animate__animated animate__fadeIn'>
          <div className='banner-img style-2'>
            <div className='banner-text'>
              <h2 className='mb-100'>Bring nature into your home</h2>

              <Link href='/products' className='btn btn-xs'>
                Shop Now<i className='fi-rs-arrow-small-right'></i>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-lg-9 col-md-12'>
          <div className='tab-content' id='myTabContent'>
            <div className={active === 1 ? 'tab-pane fade show active' : 'tab-pane fade'}>
              <div className='carausel-4-columns-cover card-product-small arrow-center position-relative'>
                <FeaturedSlider products={products.featured} />
              </div>
            </div>
            <div className={active === 2 ? 'tab-pane fade show active' : 'tab-pane fade'}>
              <div className='carausel-4-columns-cover card-product-small arrow-center position-relative'>
                <TrendingSlider products={products.trending} />
              </div>
            </div>
            <div className={active === 3 ? 'tab-pane fade show active' : 'tab-pane fade'}>
              <div className='carausel-4-columns-cover card-product-small arrow-center position-relative'>
                <NewArrivalTabSlider products={products.newArrival} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

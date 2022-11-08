import { Product } from '@models/product.model';
import { useEffect, useState } from 'react';
import useSWR from 'swr/immutable';

import { FeaturedTab } from '../elements/FeaturedTab';
import { NewArrivalTab } from '../elements/NewArrivalTab';
import { TrendingTab } from '../elements/TrendingTab';

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

export const CategoryTab = () => {
  const { data, error } = useSWR('/static/products.json', fetcher);

  const [active, setActive] = useState('1');

  // useEffect(() => {
  //   catPAll();
  // }, []);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className='section-title style-2'>
        <h3>Popular Products</h3>
        {/* <ul className='nav nav-tabs links' id='myTab' role='tablist'>
          <li className='nav-item wow animate__animated animate__fadeIn' role='presentation'>
            <button className={active === '1' ? 'nav-link active' : 'nav-link'} onClick={catPAll}>
              All
            </button>
          </li>
          <li className='nav-item wow animate__animated animate__fadeIn' role='presentation'>
            <button className={active === '2' ? 'nav-link active' : 'nav-link'} onClick={catP1}>
              Featured
            </button>
          </li>
          <li className='nav-item wow animate__animated animate__fadeIn' role='presentation'>
            <button className={active === '3' ? 'nav-link active' : 'nav-link'} onClick={catP2}>
              Popular
            </button>
          </li>
          <li className='nav-item wow animate__animated animate__fadeIn' role='presentation'>
            <button className={active === '4' ? 'nav-link active' : 'nav-link'} onClick={catP3}>
              New added
            </button>
          </li>
        </ul> */}
      </div>

      <div className='tab-content'>
        <div className={active === '1' ? 'tab-pane fade show active' : 'tab-pane fade'}>
          <div className='row product-grid-4'>
            <FeaturedTab products={data} />
          </div>
        </div>

        <div className={active === '2' ? 'tab-pane fade show active' : 'tab-pane fade'}>
          <div className='row product-grid-4'>
            <FeaturedTab products={data} />
          </div>
        </div>

        <div className={active === '3' ? 'tab-pane fade show active' : 'tab-pane fade'}>
          <div className='row product-grid-4'>
            <TrendingTab products={data} />
          </div>
        </div>
        <div className={active === '4' ? 'tab-pane fade show active' : 'tab-pane fade'}>
          <div className='row product-grid-4'>
            <NewArrivalTab products={data} />
          </div>
        </div>
      </div>
    </>
  );
};

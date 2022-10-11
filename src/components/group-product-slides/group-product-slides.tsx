import { useState } from 'react';

import dynamic from 'next/dynamic';

import { ProductCard } from '@components/product-card';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

import styles from './styles.module.scss';
import { Product } from '@models/product.model';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface GroupProductSlide {
  id: string;
  title: string;
  products: Product[];
}

const mock: GroupProductSlide[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `tab-${index + 1}`,
  title: `New`,
  products: Array.from({ length: 8 }).map((_, index) => {
    const product: Product = {
      id: index + 1,
      name: `Product ${index + 1}`,
      slug: `product-${index + 1}`,
      reviews: [],
      categories: Array.from({ length: 3 }).map((_, indexCat) => ({
        id: indexCat + 1,
        name: `Category ${indexCat + 1}`,
        slug: `cat-${indexCat + 1}`,
      })),
      images: ['/assets/images/demos/demo-13/products/product-2.jpg'],
      variants: [],
      isNew: Math.random() < 0.5,
      isTop: Math.random() < 0.5,
      isSale: Math.random() < 0.5,
      currentPrice: 100,
      previousPrice: 110,
    };

    return product;
  }),
}));

export const GroupProductSlides = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  return (
    <>
      <div className={mergeClassNames('heading heading-flex mb-2', styles['heading-border'])}>
        <div className='heading-left'>
          <h2 className='title'>Hot Deals Products</h2>
        </div>
        <div className='heading-right'>
          <ul className='nav nav-pills nav-border-anim justify-content-center' role='tablist'>
            {mock.map((item) => (
              <li key={item.id} className='nav-item'>
                <a
                  className={mergeClassNames('nav-link', item.id === activeTab ? 'active' : '')}
                  data-bs-toggle='tab'
                  aria-selected='true'
                  id={`${item.id}-link`}
                  href={`#${item.id}-tab`}
                  aria-controls={`${item.id}-tab`}
                  role='tab'
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='tab-content tab-content-carousel'>
        {mock.map((item) => (
          <div
            key={item.id}
            className={mergeClassNames(
              'tab-pane',
              'fade',
              'p-0',
              item.id === activeTab ? 'active' : '',
              item.id === activeTab ? 'show' : '',
            )}
            id={`${item.id}-tab`}
            role='tabpanel'
            aria-labelledby={`${item.id}-link`}
          >
            <OwlCarousel
              nav={false}
              dots={true}
              margin={20}
              loop={false}
              loadedClass='owl-loaded carousel-equal-height carousel-with-shadow'
              navClass={['owl-prev owl-custom-nav icon-angle-left', 'owl-next owl-custom-nav icon-angle-right']}
              navElement={'i'}
              responsive={{
                '0': {
                  items: 2,
                },
                '480': {
                  items: 2,
                },
                '768': {
                  items: 3,
                },
                '992': {
                  items: 4,
                },
                '1280': {
                  items: 5,
                  nav: true,
                  dots: false,
                },
              }}
            >
              {item.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </OwlCarousel>
          </div>
        ))}
      </div>
    </>
  );
};

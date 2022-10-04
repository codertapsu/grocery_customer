import { useId, useState } from 'react';

import dynamic from 'next/dynamic';

import { ProductCard } from '@components/product-card';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface GroupProductSlide {
  id: string;
  title: string;
  products: any[];
}

const mock: GroupProductSlide[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `tab-${index + 1}`,
  title: `Lorem ipsum`,
  products: Array.from({ length: 5 }).map((_, index) => index + 1),
}));

export const GroupProductSlides = () => {
  const uuid = useId();

  const [activeTab, setActiveTab] = useState('tab-1');
  return (
    <div className='container'>
      <div className='heading heading-flex heading-border mb-3'>
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
              items={4}
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
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCard key={index} />
              ))}
            </OwlCarousel>
          </div>
        ))}
      </div>
    </div>
  );
};

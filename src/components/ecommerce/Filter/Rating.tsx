import { useEffect, useState } from 'react';

import { useReduxStore } from '@contexts/redux-store';

export const Rating = () => {
  const { updateProductRating } = useReduxStore();
  const ratings = [{ value: '' }, { value: '5' }, { value: '4' }, { value: '3' }, { value: '2 ' }, { value: '1' }];

  const [productRating, setProductRating] = useState('');
  const [active, setActive] = useState(0);
  useEffect(() => {
    const filters = {
      rating: productRating,
    };
    updateProductRating(filters);
  }, [productRating]);

  const handleClick = (i, target) => {
    setProductRating(target);
    setActive(active == i ? 0 : i);
  };

  return (
    <>
      {ratings.map((rate, i) => (
        <>
          <div className={active == i && 'active'} onClick={() => handleClick(i, rate.value)}>
            <a>
              {i == 0 ? (
                'All'
              ) : (
                <>
                  <div className='product-rate-cover'>
                    <div className='product-rate d-inline-block'>
                      {Number(rate.value) === 1 && <div className='product-rating' style={{ width: '20%' }}></div>}
                      {Number(rate.value) === 2 && <div className='product-rating' style={{ width: '40%' }}></div>}
                      {Number(rate.value) === 3 && <div className='product-rating' style={{ width: '60%' }}></div>}
                      {Number(rate.value) === 4 && <div className='product-rating' style={{ width: '80%' }}></div>}
                      {Number(rate.value) === 5 && <div className='product-rating' style={{ width: '100%' }}></div>}
                    </div>
                  </div>
                </>
              )}
            </a>
          </div>
        </>
      ))}
    </>
  );
};

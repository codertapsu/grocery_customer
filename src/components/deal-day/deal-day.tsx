import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Image } from '@components/image';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

import styles from './styles.module.scss';

const products = [1, 2];

interface Props {
  countTo: Date | string | number;
  products: any[];
}

export const DealDay = ({ countTo }: Props) => {
  const [countData, setCountData] = useState({
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  useEffect(() => {
    const countToDate = new Date(countTo).getTime();
    const timerId = window.setInterval(() => {
      const now = new Date().getTime();
      const distance = countToDate - now;
      const hours = Math.floor(distance / (1000 * 60 * 60));
      let remainder = distance % (1000 * 60 * 60);
      const minutes = Math.floor(remainder / (1000 * 60));
      remainder = remainder % (1000 * 60);
      const seconds = Math.floor(remainder / 1000);
      if (distance < 0) {
        window.clearInterval(timerId);
        setCountData({
          hours: '0',
          minutes: '0',
          seconds: '0',
        });
      }
      setCountData({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [countTo]);

  return (
    <div
      className={mergeClassNames('deal bg-image pt-8 pb-8', styles['deal'])}
      style={{ backgroundImage: 'url(/assets/images/deal/bg-1.jpg)' }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-12 col-md-8 col-lg-6'>
            <div className={mergeClassNames('deal-content text-center', styles['deal-content'])}>
              <h4>Limited quantities. </h4>
              <h2>Deal of the Day</h2>
              <div
                className={mergeClassNames('deal-countdown is-countdown', styles['deal-countdown'])}
                data-until='+10h'
              >
                <span className={mergeClassNames(styles['countdown-row'])}>
                  <span className={mergeClassNames(styles['countdown-section'])}>
                    <span className={mergeClassNames(styles['countdown-amount'])}>{countData.hours}</span>
                    <span className={mergeClassNames(styles['countdown-period'])}>hrs</span>
                  </span>
                  <span className={mergeClassNames(styles['countdown-section'])}>
                    <span className={mergeClassNames(styles['countdown-amount'])}>{countData.minutes}</span>
                    <span className={mergeClassNames(styles['countdown-period'])}>mins</span>
                  </span>
                  <span className={mergeClassNames(styles['countdown-section'])}>
                    <span className={mergeClassNames(styles['countdown-amount'])}>{countData.seconds}</span>
                    <span className={mergeClassNames(styles['countdown-period'])}>secs</span>
                  </span>
                </span>
              </div>
            </div>
            <div className='row deal-products'>
              {products.map((item) => (
                <div key={item} className='col-6 deal-product text-center'>
                  <figure className='product-media'>
                    <Link href={`/products/${1}`}>
                      <a>
                        <Image src='/assets/images/deal/product-1.jpg' alt='Product image' className='product-image' />
                      </a>
                    </Link>
                  </figure>
                  <div className={mergeClassNames('product-body', styles['product-body'])}>
                    <h3 className={mergeClassNames('product-title', styles['product-title'])}>
                      <Link href={`/products/${1}`}>
                        <a>Elasticated cotton shorts</a>
                      </Link>
                    </h3>
                    <div className={mergeClassNames('product-price', styles['product-price'])}>
                      <span className={mergeClassNames('new-price', styles['new-price'])}>Now $24.99</span>
                      <span className={mergeClassNames('old-price', styles['old-price'])}>Was $30.99</span>
                    </div>
                  </div>
                  <Link href={`/products/${1}`}>
                    <a className={mergeClassNames('action', styles['action'])}>shop now</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

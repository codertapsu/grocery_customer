import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  countTo: Date | string | number;
}

export const ProductCountdown = ({ countTo }: Props) => {
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
      className={mergeClassNames(styles['product-countdown'], 'is-countdown')}
      data-until='+9h'
      data-format='HMS'
      data-relative='true'
      data-labels-short='true'
    >
      <span className={mergeClassNames(styles['countdown-row'], styles['countdown-show3'])}>
        <span className={mergeClassNames(styles['countdown-section'])}>
          <span className={mergeClassNames(styles['countdown-amount'])}>{countData.hours}</span>
          <span className={mergeClassNames(styles['countdown-period'])}>Hours</span>
        </span>
        <span className={mergeClassNames(styles['countdown-section'])}>
          <span className={mergeClassNames(styles['countdown-amount'])}>{countData.minutes}</span>
          <span className={mergeClassNames(styles['countdown-period'])}>Mins</span>
        </span>
        <span className={mergeClassNames(styles['countdown-section'])}>
          <span className={mergeClassNames(styles['countdown-amount'])}>{countData.seconds}</span>
          <span className={mergeClassNames(styles['countdown-period'])}>Secs</span>
        </span>
      </span>
    </div>
  );
};

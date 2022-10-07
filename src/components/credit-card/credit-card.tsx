import { Image } from '@components/image';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import styles from './styles.module.scss';

export const CreditCard = () => {
  const ref = useRef<HTMLDivElement>();
  const isHover = useHover<HTMLDivElement>(ref);

  return (
    <div ref={ref} className={mergeClassNames(styles['card-item'], isHover ? styles['-active'] : '')}>
      <div className={mergeClassNames(styles['card-item__side'], styles['-front'])}>
        <div className={styles['card-item__focus']} style={{}} />{' '}
        <div className={styles['card-item__cover']}>
          <Image
            alt=''
            src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/1.jpeg'
            className={styles['card-item__bg']}
          />
        </div>{' '}
        <div className={styles['card-item__wrapper']}>
          <div className={styles['card-item__top']}>
            <Image
              alt=''
              src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png'
              className={styles['card-item__chip']}
            />{' '}
            <div className={styles['card-item__type']}>
              <Image
                alt=''
                src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png'
                className={styles['card-item__typeImg']}
              />
            </div>
          </div>{' '}
          <label htmlFor='cardNumber' className={styles['card-item__number']}>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={mergeClassNames(styles['card-item__numberItem'], styles['-active'])}> </div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={mergeClassNames(styles['card-item__numberItem'], styles['-active'])}> </div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={mergeClassNames(styles['card-item__numberItem'], styles['-active'])}> </div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>#</div>
            </span>
          </label>{' '}
          <div className={styles['card-item__content']}>
            <label htmlFor='cardName' className={styles['card-item__info']}>
              <div className={styles['card-item__holder']}>Card Holder</div>{' '}
              <div className={styles['card-item__name']}>Full Name</div>
            </label>{' '}
            <div className={styles['card-item__date']}>
              <label htmlFor='cardMonth' className={styles['card-item__dateTitle']}>
                Expires
              </label>{' '}
              <label htmlFor='cardMonth' className={styles['card-item__dateItem']}>
                <span>MM</span>
              </label>
              /
              <label htmlFor='cardYear' className={styles['card-item__dateItem']}>
                <span>YY</span>
              </label>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className={mergeClassNames(styles['card-item__side'], styles['-back'])}>
        <div className={styles['card-item__cover']}>
          <Image
            alt=''
            src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/1.jpeg'
            className={styles['card-item__bg']}
          />
        </div>{' '}
        <div className={styles['card-item__band']} />{' '}
        <div className={styles['card-item__cvv']}>
          <div className={styles['card-item__cvvTitle']}>CVV</div>
          <div className={styles['card-item__cvvBand']} />{' '}
          <div className={styles['card-item__type']}>
            <Image
              alt=''
              src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png'
              className={styles['card-item__typeImg']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

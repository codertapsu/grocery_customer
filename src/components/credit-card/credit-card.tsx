import { FC, useEffect, useState } from 'react';
import { Rock_Salt } from '@next/font/google';

import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { CreditCard as CardShape } from '@models/credit-card.model';

import { Image } from '../image';
import styles from './styles.module.scss';

interface Props {
  card: CardShape;
}

const RockSalt = Rock_Salt({ weight: ['400'] });

export const CreditCard: FC<Props> = ({ card }) => {
  const [bg, setBg] = useState<number>();

  useEffect(() => {
    setBg(Math.floor(Math.random() * 25 + 1));
  }, []);

  return (
    <div className={mergeClassNames(styles['card-item'])}>
      <div className={mergeClassNames(styles['card-item__side'], styles['-front'])}>
        <div className={styles['card-item__focus']} style={{}} />{' '}
        <div className={styles['card-item__cover']}>
          <Image
            alt=''
            src={`/assets/imgs/credit-cards/${bg}.jpeg`}
            width='100%'
            height='100%'
            objectFit='cover'
            className={styles['card-item__bg']}
          />
        </div>{' '}
        <div className={styles['card-item__wrapper']}>
          <div className={styles['card-item__top']}>
            <Image alt='' src='/assets/imgs/credit-cards/chip.png' width='50px' className={styles['card-item__chip']} />{' '}
            <div className={styles['card-item__type']}>
              <Image
                alt=''
                src={`/assets/imgs/credit-cards/${card?.brand || 'visa'}.png`}
                className={styles['card-item__typeImg']}
              />
            </div>
          </div>{' '}
          <div className={styles['card-item__number']}>
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
              <div className={styles['card-item__numberItem']}>{card?.last4?.charAt(0) || '#'}</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>{card?.last4?.charAt(1) || '#'}</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>{card?.last4?.charAt(2) || '#'}</div>
            </span>
            <span>
              <div className={styles['card-item__numberItem']}>{card?.last4?.charAt(3) || '#'}</div>
            </span>
          </div>{' '}
          <div className={styles['card-item__content']}>
            <div className={styles['card-item__info']}>
              <div className={styles['card-item__holder']}>Card Holder</div>{' '}
              <div className={styles['card-item__name']}>{card?.name || 'Full Name'}</div>
            </div>{' '}
            <div className={styles['card-item__date']}>
              <div className={styles['card-item__dateTitle']}>Expires</div>{' '}
              <div className={styles['card-item__dateItem']}>
                <span>{card?.expMonth || 'MM'}</span>
              </div>
              /
              <div className={styles['card-item__dateItem']}>
                <span>{card?.expYear || 'YY'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className={mergeClassNames(styles['card-item__side'], styles['-back'])}>
        <div className={styles['card-item__cover']}>
          <Image
            alt=''
            src={`/assets/imgs/credit-cards/${bg}.jpeg`}
            width='100%'
            height='100%'
            objectFit='cover'
            className={styles['card-item__bg']}
          />
        </div>{' '}
        <div className={styles['card-item__band']} />{' '}
        <div className={styles['card-item__cvv']}>
          <div className={styles['card-item__cvvTitle']}>CVV</div>
          <div className={styles['card-item__cvvBand']}>
            <span className={RockSalt.className}>{card?.name || ''}</span>
          </div>
          <div className={styles['card-item__type']}>
            <Image
              alt=''
              src={`/assets/imgs/credit-cards/${card?.brand || 'visa'}.png`}
              className={styles['card-item__typeImg']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

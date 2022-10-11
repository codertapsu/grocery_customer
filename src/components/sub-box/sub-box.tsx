import { Button } from '@components/button';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { FormEvent } from 'react';

import styles from './styles.module.scss';

export const SubBox = () => {
  const handleSubForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // (e.target as HTMLFormElement).valu
    const { email } = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    console.log(email);
    
  }

  return (
    <div
      className='cta bg-image bg-dark mb-0 pt-4 pb-5'
      style={{ backgroundImage: 'url(/assets/images/backgrounds/bg-1.jpg)' }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-8 col-lg-6'>
            <div className='cta-heading text-center'>
              <h3 className='cta-title text-white'>Get The Latest Deals</h3>
              <p className='cta-desc text-white'>
                and receive <span className='font-weight-normal'>$20 coupon</span> for first shopping
              </p>
            </div>
            <form onSubmit={handleSubForm}>
              <div className='input-group input-group-round'>
                <input
                  type='email'
                  name='email'
                  className='form-control form-floating form-control-white mb-0'
                  placeholder='Enter your Email Address'
                  aria-label='Email Address'
                  required
                />
                <div className={mergeClassNames('input-group-append', styles['input-group-append'])}>
                  <Button type='submit' fillType='filled' cornerType='pill' className={styles['btn']}>
                    <span>Subscribe</span>
                    <i className='icon-long-arrow-right' />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

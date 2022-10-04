import { mergeClassNames } from '@helpers/merge-class-names.helper';
import styles from './styles.module.scss';

export const SubBox = () => {
  return (
    <div
      className={mergeClassNames('cta cta-separator cta-half mb-0', styles['cta-border-image'])}
      style={{ backgroundImage: 'url(/assets/images/demos/demo-3/bg-2.jpg)' }}
    >
      <div className={mergeClassNames('cta-border-wrapper bg-white', styles['cta-border-wrapper'])}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className={mergeClassNames('cta-wrapper cta-text text-center', styles['cta-text'])}>
              <h3 className={mergeClassNames('cta-title', styles['cta-title'])}>Shop Social</h3>
              <p className={mergeClassNames('cta-desc', styles['cta-desc'])}>
                Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.{' '}
              </p>
              <div className='social-icons social-icons-colored justify-content-center'>
                <a href='#' className={mergeClassNames('social-icon social-facebook')} title='Facebook' target='_blank'>
                  <i className='icon-facebook-f' />
                </a>
                <a href='#' className={mergeClassNames('social-icon social-twitter')} title='Twitter' target='_blank'>
                  <i className='icon-twitter' />
                </a>
                <a
                  href='#'
                  className={mergeClassNames('social-icon social-instagram')}
                  title='Instagram'
                  target='_blank'
                >
                  <i className='icon-instagram' />
                </a>
                <a href='#' className={mergeClassNames('social-icon social-youtube')} title='Youtube' target='_blank'>
                  <i className='icon-youtube' />
                </a>
                <a
                  href='#'
                  className={mergeClassNames('social-icon social-pinterest')}
                  title='Pinterest'
                  target='_blank'
                >
                  <i className='icon-pinterest' />
                </a>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='cta-wrapper text-center'>
              <h3 className={mergeClassNames('cta-title', styles['cta-title'])}>Get the Latest Deals</h3>
              <p className={mergeClassNames('cta-desc', styles['cta-desc'])}>
                and <br />
                receive <span className='text-primary'>$20 coupon</span> for first shopping
              </p>
              <form action='#'>
                <div className='input-group'>
                  <input
                    type='email'
                    className={mergeClassNames('form-control', styles['form-control'])}
                    placeholder='Enter your Email Address'
                    aria-label='Email Adress'
                    required
                  />
                  <div className='input-group-append'>
                    <button className={mergeClassNames('btn btn-block btn-primary btn-rounded', styles['btn'])} type='submit'>
                      <i className='icon-long-arrow-right' />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

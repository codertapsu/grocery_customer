import { mergeClassNames } from '@helpers/merge-class-names.helper';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { useId, useRef, useState } from 'react';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const mock = Array.from({ length: 5 }).map((_, index) => index + 1);

export const QuickView = () => {
  const uuid = crypto.randomUUID();
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const openFullscreen = (index: number) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      itemsRef.current[index].requestFullscreen();
    }
  };

  return (
    <div className='quickView-container container'>
      <div className='quickView-content'>
        <div className='row'>
          <div className='col-lg-7 col-md-6'>
            <div className='row h-100'>
              <div className='product-left'>
                {mock.map((item, index) => (
                  <a key={item} href={`#${uuid}-${index}`} className={`carousel-dot d-block`}>
                    <NextImage
                      objectFit='contain'
                      width={'40px'}
                      height={'40px'}
                      src='/assets/images/products/product-4-thumb.jpg'
                      alt=''
                    />
                  </a>
                ))}
              </div>
              <div className='product-right'>
                <OwlCarousel
                  items={1}
                  dots={false}
                  nav={false}
                  URLhashListener={true}
                  className='h-100'
                  stageOuterClass={'owl-stage-outer h-100'}
                  stageClass={'owl-stage h-100'}
                >
                  {mock.map((item, index) => (
                    <div
                      key={item}
                      ref={(el) => (itemsRef.current[index] = el)}
                      className='intro-slide'
                      data-hash={`${uuid}-${index}`}
                    >
                      <div className={mergeClassNames('bg-white', 'w-100', 'h-100')}>
                        <NextImage
                          alt='Mountains'
                          src='/assets/images/products/product-4.jpg'
                          layout='fill'
                          objectFit='contain'
                        />
                      </div>
                      {/* <NextImage
                        layout='fixed'
                        height={'200px'}
                        width={'100%'}
                        objectFit='cover'
                        src='/assets/images/products/product-4.jpg'
                        alt='Image Desc'
                      /> */}
                      <span role='button' className='btn-fullscreen' onClick={() => openFullscreen(index)}>
                        <i className='icon-arrows' />
                      </span>
                    </div>
                  ))}
                </OwlCarousel>
                {/* <div
                  className='owl-carousel owl-theme owl-nav-inside owl-light mb-0'
                  data-bs-toggle='owl'
                  data-owl-options='{
	                        "dots": false,
	                        "nav": false, 
	                        "URLhashListener": true,
	                        "responsive": {
	                            "900": {
	                                "nav": true,
	                                "dots": true
	                            }
	                        }
	                    }'
                ></div> */}
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-6'>
            <h2 className='product-title'>Linen-blend dress</h2>
            <h3 className='product-price'>$60.00</h3>
            <div className='ratings-container'>
              <div className='ratings'>
                <div className='ratings-val' style={{ width: '20%' }} />
              </div>
              <span className='ratings-text'>( 2 Reviews )</span>
            </div>
            <p className='product-txt'>
              Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.
            </p>
            <div className='details-filter-row product-nav product-nav-thumbs'>
              <label htmlFor='size'>color:</label>
              <a href='#' className='active'>
                <NextImage
                  width={'100%'}
                  height={'100%'}
                  src='/assets/images/products/product-4-thumb.jpg'
                  alt='product desc'
                />
              </a>
              <a href='#'>
                <NextImage
                  width={'100%'}
                  height={'100%'}
                  src='/assets/images/products/product-5-thumb.jpg'
                  alt='product desc'
                />
              </a>
            </div>
            {/* End .product-nav */}
            <div className='details-filter-row details-row-size'>
              <label htmlFor='size'>Size:</label>
              <div className='select-custom'>
                <select name='size' id='size' className='form-control'>
                  <option value='#'>Select a size</option>
                  <option value='s'>Small</option>
                  <option value='m'>Medium</option>
                  <option value='l'>Large</option>
                  <option value='xl'>Extra Large</option>
                </select>
              </div>
              {/* End .select-custom */}
            </div>
            <div className='details-filter-row details-row-size'>
              <label htmlFor='qty'>Qty:</label>
              <div className='product-details-quantity'>
                <input
                  type='number'
                  id='qty'
                  className='form-control'
                  defaultValue={1}
                  min={1}
                  max={10}
                  step={1}
                  data-decimals={0}
                  required
                />
              </div>
              {/* End .product-details-quantity */}
            </div>
            {/* End .details-filter-row */}
            <div className='product-details-action'>
              <div className='details-action-wrapper'>
                <a href='#' className='btn-product btn-wishlist' title='Wishlist'>
                  <span>Add to Wishlist</span>
                </a>
                <a href='#' className='btn-product btn-compare' title='Compare'>
                  <span>Add to Compare</span>
                </a>
              </div>
              {/* End .details-action-wrapper */}
              <a href='#' className='btn-product btn-cart'>
                <span>add to cart</span>
              </a>
            </div>
            <div className='product-details-footer'>
              <div className='product-cat'>
                <span>Category:</span>
                <a href='#'>Women</a>,<a href='#'>Dresses</a>,<a href='#'>Yellow</a>
              </div>
              {/* End .product-cat */}
              <div className='social-icons social-icons-sm'>
                <span className='social-label'>Share:</span>
                <a href='#' className='social-icon' title='Facebook' target='_blank'>
                  <i className='icon-facebook-f' />
                </a>
                <a href='#' className='social-icon' title='Twitter' target='_blank'>
                  <i className='icon-twitter' />
                </a>
                <a href='#' className='social-icon' title='Instagram' target='_blank'>
                  <i className='icon-instagram' />
                </a>
                <a href='#' className='social-icon' title='Pinterest' target='_blank'>
                  <i className='icon-pinterest' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

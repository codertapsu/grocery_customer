import { Image } from './image';

export const GoodOffer = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6 col-lg-3'>
          <div className='banner banner-overlay'>
            <a href='#'>
              <Image src='/assets/images/demos/demo-13/banners/banner-1.jpg' alt='Banner' />
            </a>
            <div className='banner-content'>
              <h4 className='banner-subtitle text-white'>
                <a href='#'>Weekend Sale</a>
              </h4>
              <h3 className='banner-title text-white'>
                <a href='#'>
                  Lighting <br />
                  &amp; Accessories <br />
                  <span>25% off</span>
                </a>
              </h3>
              <a href='#' className='banner-link'>
                Shop Now <i className='icon-long-arrow-right' />
              </a>
            </div>
          </div>
        </div>
        <div className='col-sm-6 col-lg-3 order-lg-last'>
          <div className='banner banner-overlay'>
            <a href='#'>
              <Image src='/assets/images/demos/demo-13/banners/banner-3.jpg' alt='Banner' />
            </a>
            <div className='banner-content'>
              <h4 className='banner-subtitle text-white'>
                <a href='#'>Smart Offer</a>
              </h4>
              <h3 className='banner-title text-white'>
                <a href='#'>
                  Anniversary <br />
                  Special <br />
                  <span>15% off</span>
                </a>
              </h3>
              <a href='#' className='banner-link'>
                Shop Now <i className='icon-long-arrow-right' />
              </a>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='banner banner-overlay'>
            <a href='#'>
              <Image src='/assets/images/demos/demo-13/banners/banner-2.jpg' alt='Banner' />
            </a>
            <div className='banner-content'>
              <h4 className='banner-subtitle d-none d-sm-block text-white'>
                <a href='#'>Amazing Value</a>
              </h4>
              <h3 className='banner-title text-white'>
                <a href='#'>
                  Clothes Trending <br />
                  Spring Collection 2019 <br />
                  <span>from $12,99</span>
                </a>
              </h3>
              <a href='#' className='banner-link'>
                Discover Now <i className='icon-long-arrow-right' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Image } from './image';

export const AdsBanner = () => {
  return (
    <div className='container ads-banner'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='banner banner-overlay banner-overlay-light'>
            <a href='#'>
              <Image src='/assets/images/demos/demo-13/banners/banner-4.jpg' alt='Banner' />
            </a>
            <div className='banner-content'>
              <h4 className='banner-subtitle d-none d-sm-block'>
                <a href='#'>Spring Sale is Coming</a>
              </h4>
              <h3 className='banner-title'>
                <a href='#'>
                  All Smart Watches <br />
                  Discount <br />
                  <span className='text-primary'>15% off</span>
                </a>
              </h3>
              <a href='#' className='banner-link banner-link-dark'>
                Discover Now <i className='icon-long-arrow-right' />
              </a>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='banner banner-overlay'>
            <a href='#'>
              <Image src='/assets/images/demos/demo-13/banners/banner-5.png' alt='Banner' />
            </a>
            <div className='banner-content'>
              <h4 className='banner-subtitle d-none  d-sm-block text-white'>
                <a href='#'>Amazing Value</a>
              </h4>
              <h3 className='banner-title text-white'>
                <a href='#'>
                  Headphones Trending <br />
                  JBL Harman <br />
                  <span>from $59,99</span>
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

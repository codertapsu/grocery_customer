import NextImage from 'next/image';
import Link from 'next/link';

export const Banner2 = () => {
  return (
    <>
      <div className='banner-img banner-big wow fadeIn animated f-none'>
        <NextImage
          width='0'
          height='0'
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          src='/assets/imgs/banner/banner-4.png'
          alt=''
        />
        <div className='banner-text d-md-block d-none'>
          <h4 className='mb-15 text-brand mt-40'>Repair Services</h4>
          <h1 className='fw-600 mb-20'>
            We&lsquo;re an Apple <br />
            Authorised Service Provider
          </h1>

          <Link href='/products' className='btn'>
            Learn More<i className='fi-rs-arrow-right'></i>
          </Link>
        </div>
      </div>
    </>
  );
};

import NextImage from 'next/image';
import Link from 'next/link';

export const ExplorePopularCategories = () => {
  return (
    <div className='container'>
      <h2 className='title mb-2 text-center'>Explore Popular Categories</h2>
      <div className='cat-blocks-container'>
        <div className='row'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='col-6 col-sm-4 col-lg-2'>
              <Link href={`/categories/${index + 1}`}>
                <a className='cat-block'>
                  <figure className='w-100'>
                    <span className='w-100'>
                      <NextImage
                        src={`/assets/images/demos/demo-13/cats/${index + 1}.jpg`}
                        alt='Category image'
                        layout='intrinsic'
                        width={'100%'}
                        height={'100%'}
                      />
                    </span>
                  </figure>
                  <h3 className='cat-block-title'>Computer &amp; Laptop</h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

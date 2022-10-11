import { mergeClassNames } from '@helpers/merge-class-names.helper';
import NextImage from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

const categories = [1, 2, 3, 4, 5, 6];

export const ExplorePopularCategories = () => {
  return (
    <>
      <h2 className='title mb-4 text-center'>Explore Popular Categories</h2>
      <div className={mergeClassNames(styles['cat-blocks-container'])}>
        <div className='row'>
          {categories.map((item) => (
            <div key={item} className='col-6 col-sm-4 col-lg-2'>
              <Link href={`/categories/${item}`}>
                <a className={mergeClassNames(styles['cat-block'])}>
                  <figure className='w-100'>
                    <span className='w-100'>
                      <NextImage
                        src={`/assets/images/demos/demo-13/cats/${item}.jpg`}
                        alt='Category image'
                        layout='intrinsic'
                        width={'100%'}
                        height={'100%'}
                      />
                    </span>
                  </figure>
                  <h3 className={mergeClassNames(styles['cat-block-title'])}>Computer &amp; Laptop</h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

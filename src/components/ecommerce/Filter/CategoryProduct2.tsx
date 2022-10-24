import Image from 'next/future/image';
import { useRouter } from 'next/router';

import { useReduxStore } from '@contexts/redux-store';

export const CategoryProduct2 = () => {
  const { updateProductCategory } = useReduxStore();
  const router = useRouter();

  // const removeSearchTerm = () => {
  //     router.push({
  //         pathname: "/products",
  //     });
  // };

  const selectCategory = (e, category) => {
    e.preventDefault();
    // removeSearchTerm();
    updateProductCategory(category);
    router.push({
      pathname: '/products',
      query: {
        cat: category, //
      },
    });
  };
  return (
    <>
      <ul>
        <li onClick={(e) => selectCategory(e, 'jeans')}>
          <a>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              src='/assets/imgs/theme/icons/category-1.svg'
              alt=''
            />
            Milks & Dairies
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'shoe')}>
          <a>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              src='/assets/imgs/theme/icons/category-2.svg'
              alt=''
            />
            Clothing
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'jacket')}>
          <a>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              src='/assets/imgs/theme/icons/category-3.svg'
              alt=''
            />
            Pet Foods{' '}
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'trousers')}>
          <a>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              src='/assets/imgs/theme/icons/category-4.svg'
              alt=''
            />
            Baking material
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'accessories')}>
          <a>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              src='/assets/imgs/theme/icons/category-5.svg'
              alt=''
            />
            Fresh Fruit
          </a>
        </li>
      </ul>
    </>
  );
};


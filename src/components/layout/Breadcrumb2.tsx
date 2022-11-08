import Link from 'next/link';
import { useRouter } from 'next/router';

import { Tags } from '../ecommerce/Filter/Tags';

export const Breadcrumb2 = () => {
  const router = useRouter();

  const titlex = router.query.cat;
  return (
    <>
      <div className='page-header mt-30 mb-50'>
        <div className='container'>
          <div className='archive-header'>
            <div className='row align-items-center'>
              <div className='col-xl-3'>
                <h1 className='mb-15 text-capitalize'>{titlex ? titlex : 'Category'}</h1>
                <div className='breadcrumb'>
                  <Link href='/' rel='nofollow'>
                    <i className='fi-rs-home mr-5'></i>Home
                  </Link>
                  <span></span> Shop <span></span> {titlex}
                </div>
              </div>
              <div className='col-xl-9 d-none d-xl-block text-end'>
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { BannerCategory } from '@components/banner';
import { Breadcrumb } from '@components/breadcrumb';
import { Image } from '@components/image';
import { Layout } from '@components/layout';
import Seo from '@components/seo';
import { useAuth } from '@contexts/auth';
import { useHttpClient } from '@contexts/http-client';
import { HttpClientInstance } from '@contexts/http-client/http-client';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import styles from './styles.module.scss';

const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomZeroToTwo = () => randomIntFromInterval(0, 2);

interface Props {
  categories: {
    id: number;
    name: string;
    size: number;
  }[];
}

const Categories = ({ categories }: Props) => {
  // const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const httpClient = useHttpClient();

  const toggleFilter = () => {
    document.body.classList.toggle('sidebar-filter-active');
  };

  const initialize = async (controller: AbortController) => {
    try {
      const response = await httpClient.get<any[]>('/categories', { signal: controller.signal });
      // setCategories(response.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    if (user) {
      initialize(controller);
    }

    return () => {
      controller.abort('View is destroyed!');
    };
  }, [user]);

  return (
    <Layout>
      <Seo templateTitle='Categories' description='Pre-built components with awesome default' />
      <div>
        <div
          className='page-header text-center'
          style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
        >
          <div className='container'>
            <h1 className='page-title'>
              Product Category Boxed<span>Shop</span>
            </h1>
          </div>
        </div>
        {/* <Breadcrumb /> */}
        <nav aria-label='breadcrumb' className='breadcrumb-nav breadcrumb-with-filter'>
          <div className='container'>
            <span role='button' className='sidebar-toggler' onClick={toggleFilter}>
              <i className='icon-bars' />
              Filters
            </span>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='index.html'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Shop</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Product Category</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Boxed
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>

        <div className='page-content'>
          <div className='categories-page'>
            <div className='container'>
              {/* <div className={styles['grid']}>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={mergeClassNames(
                      'banner banner-cat banner-badge',
                      styles[['square', 'tall', 'wide'][cat.size]],
                    )}
                  >
                    <Link href={{ pathname: `/categories/${cat.id}` }}>
                      <a>
                        <Image src={`/assets/images/category/boxed/banner-${cat.id}.jpg`} alt='Banner' />
                      </a>
                    </Link>
                    <Link href={{ pathname: `/categories/${cat.id}` }}>
                      <a className='banner-link'>
                        <h3 className='banner-title'>Dresses</h3>
                        <h4 className='banner-subtitle'>3 Products</h4>
                        <span className='banner-link-text'>Shop Now</span>
                      </a>
                    </Link>
                  </div>
                ))}
              </div> */}
              <div className='row'>
                <div className='col-md-6'>
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-1.jpg'
                    title='Dresses'
                    subtitle='3 Products'
                    linkText='Shop Now'
                  />
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-2.jpg'
                    title='Jackets'
                    subtitle='2 Products'
                    linkText='Shop Now'
                  />
                </div>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <BannerCategory
                        id={1}
                        image='/assets/images/category/boxed/banner-3.jpg'
                        title='T-shirts'
                        subtitle='4 Products'
                        linkText='Shop Now'
                      />
                    </div>
                    <div className='col-sm-6'>
                      <BannerCategory
                        id={1}
                        image='/assets/images/category/boxed/banner-4.jpg'
                        title='Jeans'
                        subtitle='3 Products'
                        linkText='Shop Now'
                      />
                    </div>
                  </div>
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-5.jpg'
                    title='Bags'
                    subtitle='3 Products'
                    linkText='Shop Now'
                  />
                </div>
                <div className='col-sm-6 col-md-3'>
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-6.jpg'
                    title='Sport wear'
                    subtitle='3 Products'
                    linkText='Shop Now'
                  />
                </div>
                <div className='col-sm-6 col-md-3 order-md-last'>
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-8.jpg'
                    title='Jumpers'
                    subtitle='3 Products'
                    linkText='Shop Now'
                  />
                </div>
                <div className='col-md-6'>
                  <BannerCategory
                    id={1}
                    image='/assets/images/category/boxed/banner-7.jpg'
                    title='Shoes'
                    subtitle='3 Products'
                    linkText='Shop Now'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='sidebar-filter-overlay' onClick={toggleFilter} />
          <aside className='sidebar-shop sidebar-filter sidebar-filter-banner'>
            <div className='sidebar-filter-wrapper'>
              <div className='widget widget-clean'>
                <label>
                  <i className='icon-close' />
                  Filters
                </label>
                <a href='#' className='sidebar-filter-clear'>
                  Clean All
                </a>
              </div>
              <div className='widget'>
                <h3 className='widget-title'>Browse Category</h3>
                <div className='widget-body'>
                  <div className='filter-items filter-items-count'>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-1' />
                        <label className='custom-control-label' htmlFor='cat-1'>
                          Women
                        </label>
                      </div>
                      <span className='item-count'>3</span>
                    </div>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-2' />
                        <label className='custom-control-label' htmlFor='cat-2'>
                          Men
                        </label>
                      </div>
                      <span className='item-count'>0</span>
                    </div>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-3' />
                        <label className='custom-control-label' htmlFor='cat-3'>
                          Holiday Shop
                        </label>
                      </div>
                      <span className='item-count'>0</span>
                    </div>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-4' />
                        <label className='custom-control-label' htmlFor='cat-4'>
                          Gifts
                        </label>
                      </div>
                      <span className='item-count'>0</span>
                    </div>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-5' />
                        <label className='custom-control-label' htmlFor='cat-5'>
                          Homeware
                        </label>
                      </div>
                      <span className='item-count'>0</span>
                    </div>
                    <div className='filter-item'>
                      <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='cat-6' />
                        <label className='custom-control-label' htmlFor='cat-6'>
                          Grid Categories Fullwidth
                        </label>
                      </div>
                      <span className='item-count'>13</span>
                    </div>
                    <div className='sub-filter-items'>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-7' />
                          <label className='custom-control-label' htmlFor='cat-7'>
                            Dresses
                          </label>
                        </div>
                        <span className='item-count'>3</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-8' />
                          <label className='custom-control-label' htmlFor='cat-8'>
                            T-shirts
                          </label>
                        </div>
                        <span className='item-count'>0</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-9' />
                          <label className='custom-control-label' htmlFor='cat-9'>
                            Bags
                          </label>
                        </div>
                        <span className='item-count'>4</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-10' />
                          <label className='custom-control-label' htmlFor='cat-10'>
                            Jackets
                          </label>
                        </div>
                        <span className='item-count'>2</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-11' />
                          <label className='custom-control-label' htmlFor='cat-11'>
                            Shoes
                          </label>
                        </div>
                        <span className='item-count'>2</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-12' />
                          <label className='custom-control-label' htmlFor='cat-12'>
                            Jumpers
                          </label>
                        </div>
                        <span className='item-count'>1</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-13' />
                          <label className='custom-control-label' htmlFor='cat-13'>
                            Jeans
                          </label>
                        </div>
                        <span className='item-count'>1</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-14' />
                          <label className='custom-control-label' htmlFor='cat-14'>
                            Sportwear
                          </label>
                        </div>
                        <span className='item-count'>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

// Next.js will run this function on every request
export async function getServerSideProps(context) {
  // fetch data from external API
  // const res = await HttpClientInstance
  // const post = await res.json();

  // Whatever is in the props object, post in our case
  // will be passed to the PostDetailPage component
  return {
    props: {
      categories: [
        {
          id: 1,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 2,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 3,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 4,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 5,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 6,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 7,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
        {
          id: 8,
          name: 'Dresses',
          size: randomZeroToTwo(),
        },
      ],
      // post,
    },
  };
}

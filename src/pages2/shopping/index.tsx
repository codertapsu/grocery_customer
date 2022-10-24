import { ChangeEvent, useEffect, useReducer, useState } from 'react';

import { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

import { Breadcrumb } from '@components/breadcrumb';
import { Image } from '@components/image';
import { Layout } from '@components/layout2';
import { PageHeader } from '@components/page-header';
import { Seo } from '@components/seo';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

import styles from './styles.module.scss';

const Nouislider = dynamic(() => import('nouislider-react'), {
  ssr: false,
});

const minPrice = 0;
const maxPrice = 1000;

const getParams = (url = window.location.toString()) => {
  // Create a params object
  const params: Record<string, any> = {};

  new URL(url).searchParams.forEach(function (val, key) {
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(val);
    } else {
      // params[key] = val;
      params[key] = [val];
    }
  });

  return params;
};

interface FilterState {
  brand: string[];
  cat: string[];
  color: string[];
  price: number[];
  size: string[];
}

enum ActionType {
  Clear = 'Clear',
  UpdateBrand = 'UpdateBrand',
  UpdateCat = 'UpdateCat',
  UpdateColor = 'UpdateColor',
  UpdatePrice = 'UpdatePrice',
  UpdateSize = 'UpdateSize',
  UpdateAll = 'UpdateAll',
}

type Action =
  | {
      data: string[];
      type:
        | ActionType.UpdateBrand
        | ActionType.UpdateCat
        | ActionType.UpdateColor
        | ActionType.UpdatePrice
        | ActionType.UpdateSize;
    }
  | {
      type: ActionType.Clear;
    }
  | {
      type: ActionType.UpdateAll;
      data: FilterState;
    };

const initialFilterState: FilterState = {
  brand: [],
  cat: [],
  color: [],
  price: [],
  size: [],
};

const filterReducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case ActionType.UpdateBrand: {
      return { ...state, brand: action.data };
    }
    case ActionType.UpdateCat: {
      return { ...state, cat: action.data };
    }
    case ActionType.UpdateColor: {
      return { ...state, color: action.data };
    }
    case ActionType.UpdatePrice: {
      return { ...state, price: action.data.map(Number) };
    }
    case ActionType.UpdateSize: {
      return { ...state, size: action.data };
    }
    case ActionType.UpdateAll: {
      return action.data;
    }
    case ActionType.Clear: {
      return initialFilterState;
    }

    default: {
      return state;
    }
  }
};

interface Props {
  filterBrands: { name: string; value: string }[];
  filterCategories: { name: string; value: string }[];
  filterColors: { name: string; value: string }[];
  filterSizes: { name: string; value: string }[];
}

const Shopping: NextPage<Props> = ({ filterBrands, filterCategories, filterColors, filterSizes }) => {
  const [gridCol, setGridCol] = useState(4);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
  const router = useRouter();

  useEffect(() => {
    if (state.cat.length || state.size.length || state.color.length || state.brand.length || state.price.length) {
      const searchParams = new URLSearchParams();
      state.size.forEach((item) => {
        searchParams.append('size', item);
      });
      state.cat.forEach((item) => {
        searchParams.append('cat', item);
      });
      state.color.forEach((item) => {
        searchParams.append('color', item);
      });
      state.brand.forEach((item) => {
        searchParams.append('brand', item);
      });
      if (state.price[0] !== minPrice || state.price[1] !== maxPrice) {
        searchParams.append('priceFrom', String(state.price[0]));
        searchParams.append('priceTo', String(state.price[1]));
      }
      const isChanged = `?${searchParams.toString()}` !== window.location.search;
      if (isChanged) {
        router.replace(
          {
            pathname: `/shopping`,
            query: searchParams.toString(),
          },
          undefined,
          { shallow: true },
        );
      }
    }
  }, [state.cat, state.size, state.color, state.brand, state.price]);

  useEffect(() => {
    const stateFromUrl = getParams();
    console.log(stateFromUrl);

    const priceFrom =
      stateFromUrl.priceFrom && stateFromUrl.priceFrom[0] && stateFromUrl.priceFrom[0] !== 'NaN'
        ? Number(stateFromUrl.priceFrom[0])
        : minPrice;
    const priceTo =
      stateFromUrl.priceTo && stateFromUrl.priceTo[0] && stateFromUrl.priceTo[0] !== 'NaN'
        ? Number(stateFromUrl.priceTo[0])
        : maxPrice;
    dispatch({
      type: ActionType.UpdateAll,
      data: {
        brand: stateFromUrl.brand || [],
        cat: stateFromUrl.cat || [],
        size: stateFromUrl.size || [],
        color: stateFromUrl.color || [],
        price: [priceFrom, priceTo],
      },
    });

    return () => {
      //
    };
  }, []);

  const products = Array.from({ length: 10 }).map((_, index) => ({ id: index + 1 }));

  const handleChangeSizes = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    let data = state.size;
    if (inputElement.checked) {
      data.push(inputElement.name);
    } else {
      data = data.filter((item) => item !== inputElement.name);
    }
    data = Array.from(new Set(data));
    dispatch({
      data,
      type: ActionType.UpdateSize,
    });
  };

  const handleChangeCategories = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    let data = state.cat;
    if (inputElement.checked) {
      data.push(inputElement.name);
    } else {
      data = data.filter((item) => item !== inputElement.name);
    }
    data = Array.from(new Set(data));
    dispatch({
      data,
      type: ActionType.UpdateCat,
    });
  };

  const handleChangeBrands = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    let data = state.brand;
    if (inputElement.checked) {
      data.push(inputElement.name);
    } else {
      data = data.filter((item) => item !== inputElement.name);
    }
    data = Array.from(new Set(data));
    dispatch({
      data,
      type: ActionType.UpdateBrand,
    });
  };

  const handleChangePrices = (data: string[]) => {
    dispatch({
      data,
      type: ActionType.UpdatePrice,
    });
  };

  const handleChangeColors = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    let data = state.color;
    if (inputElement.checked) {
      data.push(inputElement.name);
    } else {
      data = data.filter((item) => item !== inputElement.name);
    }
    data = Array.from(new Set(data));
    dispatch({
      data,
      type: ActionType.UpdateColor,
    });
  };

  const handleCleanFilter = () => {
    router
      .push(
        {
          pathname: `/shopping`,
          query: '',
        },
        undefined,
        { shallow: true },
      )
      .then(() => {
        dispatch({
          type: ActionType.Clear,
        });
      });
  };

  const toggleMobileFilter = () => {
    setOpenMobileFilter(!openMobileFilter);
  };

  return (
    <Layout>
      <Seo />
      <PageHeader backgroundImage={'url("/assets/images/page-header-bg.jpg")'}>
        Products<span>Shop</span>
      </PageHeader>
      <Breadcrumb items={[{ href: '', name: 'Shopping' }]} />
      <div className='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9'>
              <div className='toolbox'>
                <div className='toolbox-left'>
                  <div className='toolbox-info'>
                    Showing <span>9 of 56</span> Products
                  </div>
                </div>
                <div className='toolbox-right'>
                  <div className='toolbox-sort'>
                    <label htmlFor='sortby'>Sort by:</label>
                    <div className='select-custom'>
                      <select name='sortby' id='sortby' className='form-control'>
                        <option value='popularity'>Most Popular</option>
                        <option value='rating'>Most Rated</option>
                        <option value='date'>Date</option>
                      </select>
                    </div>
                  </div>
                  <div className='toolbox-layout'>
                    <span
                      className={mergeClassNames('btn-layout', gridCol === 1 ? 'active' : '')}
                      onClick={() => setGridCol(1)}
                    >
                      <svg width={16} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={10} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={10} height={4} />
                      </svg>
                    </span>
                    <span
                      className={mergeClassNames('btn-layout', gridCol === 2 ? 'active' : '')}
                      onClick={() => setGridCol(2)}
                    >
                      <svg width={10} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                      </svg>
                    </span>
                    <span
                      className={mergeClassNames('btn-layout', gridCol === 3 ? 'active' : '')}
                      onClick={() => setGridCol(3)}
                    >
                      <svg width={16} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={12} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                        <rect x={12} y={6} width={4} height={4} />
                      </svg>
                    </span>
                    <span
                      className={mergeClassNames('btn-layout', gridCol === 4 ? 'active' : '')}
                      onClick={() => setGridCol(4)}
                    >
                      <svg width={22} height={10}>
                        <rect x={0} y={0} width={4} height={4} />
                        <rect x={6} y={0} width={4} height={4} />
                        <rect x={12} y={0} width={4} height={4} />
                        <rect x={18} y={0} width={4} height={4} />
                        <rect x={0} y={6} width={4} height={4} />
                        <rect x={6} y={6} width={4} height={4} />
                        <rect x={12} y={6} width={4} height={4} />
                        <rect x={18} y={6} width={4} height={4} />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className='products mb-3'>
                {gridCol === 1 && (
                  <>
                    {products.map((product) => (
                      <div key={product.id} className='product product-list'>
                        <div className='row'>
                          <div className='col-6 col-lg-3'>
                            <figure className='product-media'>
                              <span className='product-label label-new'>New</span>
                              <a href='product.html'>
                                <Image
                                  src='/assets/images/products/product-4.jpg'
                                  alt='Product image'
                                  className='product-image'
                                />
                              </a>
                            </figure>
                          </div>
                          <div className='col-6 col-lg-3 order-lg-last'>
                            <div className='product-list-action'>
                              <div className='product-price'>$60.00</div>
                              <div className='ratings-container'>
                                <div className='ratings'>
                                  <div className='ratings-val' style={{ width: '20%' }} />
                                </div>
                                <span className='ratings-text'>( 2 Reviews )</span>
                              </div>
                              <div className='product-action'>
                                <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                                  <span>quick view</span>
                                </a>
                                <a href='#' className='btn-product btn-compare' title='Compare'>
                                  <span>compare</span>
                                </a>
                              </div>
                              <a href='#' className='btn-product btn-cart'>
                                <span>add to cart</span>
                              </a>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='product-body product-action-inner'>
                              <a href='#' className='btn-product btn-wishlist' title='Add to wishlist'>
                                <span>add to wishlist</span>
                              </a>
                              <div className='product-cat'>
                                <a href='#'>Women</a>
                              </div>
                              <h3 className='product-title'>
                                <a href='product.html'>Brown paperbag waist pencil skirt</a>
                              </h3>
                              <div className='product-content'>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
                                  Pellentesque{' '}
                                </p>
                              </div>
                              <div className='product-nav product-nav-thumbs'>
                                <a href='#' className='active'>
                                  <NextImage
                                    width={'40px'}
                                    height={'40px'}
                                    src='/assets/images/products/product-4-thumb.jpg'
                                    alt='product desc'
                                  />
                                </a>
                                <a href='#'>
                                  <NextImage
                                    width={'40px'}
                                    height={'40px'}
                                    src='/assets/images/products/product-4-2-thumb.jpg'
                                    alt='product desc'
                                  />
                                </a>
                                <a href='#'>
                                  <NextImage
                                    width={'40px'}
                                    height={'40px'}
                                    src='/assets/images/products/product-4-3-thumb.jpg'
                                    alt='product desc'
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {gridCol !== 1 && (
                  <div className='row justify-content-center'>
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={mergeClassNames(
                          [2, 3, 4].includes(gridCol) ? 'col-6' : '',
                          gridCol === 3 ? 'col-md-4 col-lg-4' : '',
                          gridCol === 4 ? 'col-md-4 col-lg-4 col-xl-3' : '',
                        )}
                      >
                        <div className='product product-7 text-center'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/product-5.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                            <div className='product-action-vertical'>
                              <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                                <span>add to wishlist</span>
                              </a>
                              <a
                                href='popup/quickView.html'
                                className='btn-product-icon btn-quickview'
                                title='Quick view'
                              >
                                <span>Quick view</span>
                              </a>
                              <a href='#' className='btn-product-icon btn-compare' title='Compare'>
                                <span>Compare</span>
                              </a>
                            </div>
                            <div className='product-action'>
                              <a href='#' className='btn-product btn-cart'>
                                <span>add to cart</span>
                              </a>
                            </div>
                          </figure>
                          <div className='product-body'>
                            <div className='product-cat'>
                              <a href='#'>Dresses</a>
                            </div>
                            <h3 className='product-title'>
                              <a href='product.html'>Dark yellow lace cut out swing dress</a>
                            </h3>
                            <div className='product-price'>$84.00</div>
                            <div className='ratings-container'>
                              <div className='ratings'>
                                <div className='ratings-val' style={{ width: '0%' }} />
                              </div>
                              <span className='ratings-text'>( 0 Reviews )</span>
                            </div>
                            <div className='product-nav product-nav-thumbs'>
                              <a href='#' className='active'>
                                <NextImage
                                  width={'40px'}
                                  height={'40px'}
                                  src='/assets/images/products/product-5-thumb.jpg'
                                  alt='product desc'
                                />
                              </a>
                              <a href='#'>
                                <NextImage
                                  width={'40px'}
                                  height={'40px'}
                                  src='/assets/images/products/product-5-2-thumb.jpg'
                                  alt='product desc'
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <nav aria-label='Page navigation'>
                <ul className={mergeClassNames('pagination', gridCol !== 1 ? 'justify-content-center' : '')}>
                  <li className='page-item disabled'>
                    <a
                      className='page-link page-link-prev'
                      href='#'
                      aria-label='Previous'
                      tabIndex={-1}
                      aria-disabled='true'
                    >
                      <span aria-hidden='true'>
                        <i className='icon-long-arrow-left' />
                      </span>
                      Prev
                    </a>
                  </li>
                  <li className='page-item active' aria-current='page'>
                    <a className='page-link' href='#'>
                      1
                    </a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link' href='#'>
                      2
                    </a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link' href='#'>
                      3
                    </a>
                  </li>
                  <li className='page-item-total'>of 6</li>
                  <li className='page-item'>
                    <a className='page-link page-link-next' href='#' aria-label='Next'>
                      Next{' '}
                      <span aria-hidden='true'>
                        <i className='icon-long-arrow-right' />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <aside className='col-lg-3 order-lg-first'>
              <div
                className={mergeClassNames(
                  'sidebar sidebar-shop',
                  styles['sidebar'],
                  styles['sidebar-shop'],
                  openMobileFilter ? styles['active'] : '',
                )}
              >
                <div className='widget widget-clean'>
                  <label className={mergeClassNames(styles['filter-label'])}>Filters:</label>
                  <button
                    type='button'
                    className={mergeClassNames('close-filter border-0 bg-transparent', styles['close-filter'])}
                    onClick={toggleMobileFilter}
                  >
                    <i className='icon-close me-2' />
                    Filters
                  </button>
                  <button
                    type='button'
                    className='sidebar-filter-clear clean-btn border-0 bg-transparent'
                    onClick={handleCleanFilter}
                  >
                    Clean All
                  </button>
                </div>
                <div className='widget widget-collapsible'>
                  <h3 className='widget-title'>
                    <a
                      data-bs-toggle='collapse'
                      href='#widget-1'
                      role='button'
                      aria-expanded='true'
                      aria-controls='widget-1'
                    >
                      Category
                    </a>
                  </h3>
                  <div className='collapse show' id='widget-1'>
                    <div className='widget-body'>
                      <div className='filter-items filter-items-count'>
                        {(filterCategories || []).map((item) => {
                          const isChecked = state.cat.some((it) => it === item.value);
                          return (
                            <div key={item.value} className='filter-item'>
                              <div className='custom-control custom-checkbox'>
                                <input
                                  type='checkbox'
                                  className='custom-control-input'
                                  id={`cat-${item.value}`}
                                  name={item.value}
                                  checked={isChecked}
                                  onChange={handleChangeCategories}
                                />
                                <label className='custom-control-label' htmlFor={`cat-${item.value}`}>
                                  {item.name}
                                </label>
                              </div>
                              <span className='item-count'>3</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='widget widget-collapsible'>
                  <h3 className='widget-title'>
                    <a
                      data-bs-toggle='collapse'
                      href='#widget-2'
                      role='button'
                      aria-expanded='true'
                      aria-controls='widget-2'
                    >
                      Size
                    </a>
                  </h3>
                  <div className='collapse show' id='widget-2'>
                    <div className='widget-body'>
                      <div className='filter-items'>
                        {(filterSizes || []).map((item) => {
                          const isChecked = state.size.some((it) => it === item.value);
                          return (
                            <div key={item.value} className='filter-item'>
                              <div className='custom-control custom-checkbox'>
                                <input
                                  type='checkbox'
                                  className='custom-control-input'
                                  id={`size-${item.value}`}
                                  name={item.value}
                                  checked={isChecked}
                                  onChange={handleChangeSizes}
                                />
                                <label className='custom-control-label' htmlFor={`size-${item.value}`}>
                                  {item.value}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='widget widget-collapsible'>
                  <h3 className='widget-title'>
                    <a
                      data-bs-toggle='collapse'
                      href='#widget-3'
                      role='button'
                      aria-expanded='true'
                      aria-controls='widget-3'
                    >
                      Color
                    </a>
                  </h3>
                  <div className='collapse show' id='widget-3'>
                    <div className='widget-body'>
                      <div className='filter-colors'>
                        {(filterColors || []).map((item) => {
                          const isChecked = state.color.some((it) => it === item.name);
                          return (
                            <label
                              key={item.name}
                              className={mergeClassNames('filter-color-item', isChecked ? 'selected' : '')}
                              style={{ background: item.value }}
                            >
                              <input
                                type='checkbox'
                                style={{ display: 'none' }}
                                name={item.name}
                                checked={isChecked}
                                onChange={handleChangeColors}
                              />
                              <span className='visually-hidden'>Color Name</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='widget widget-collapsible'>
                  <h3 className='widget-title'>
                    <a
                      data-bs-toggle='collapse'
                      href='#widget-4'
                      role='button'
                      aria-expanded='true'
                      aria-controls='widget-4'
                    >
                      Brand
                    </a>
                  </h3>
                  <div className='collapse show' id='widget-4'>
                    <div className='widget-body'>
                      <div className='filter-items'>
                        {(filterBrands || []).map((item) => {
                          const isChecked = state.brand.some((it) => it === item.value);
                          return (
                            <div key={item.value} className='filter-item'>
                              <div className='custom-control custom-checkbox'>
                                <input
                                  type='checkbox'
                                  className='custom-control-input'
                                  id={`brand-${item.value}`}
                                  name={item.value}
                                  checked={isChecked}
                                  onChange={handleChangeBrands}
                                />
                                <label className='custom-control-label' htmlFor={`brand-${item.value}`}>
                                  {item.name}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-2' />
                            <label className='custom-control-label' htmlFor='brand-2'>
                              River Island
                            </label>
                          </div>
                        </div>
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-3' />
                            <label className='custom-control-label' htmlFor='brand-3'>
                              Geox
                            </label>
                          </div>
                        </div>
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-4' />
                            <label className='custom-control-label' htmlFor='brand-4'>
                              New Balance
                            </label>
                          </div>
                        </div>
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-5' />
                            <label className='custom-control-label' htmlFor='brand-5'>
                              UGG
                            </label>
                          </div>
                        </div>
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-6' />
                            <label className='custom-control-label' htmlFor='brand-6'>
                              F&amp;F
                            </label>
                          </div>
                        </div>
                        <div className='filter-item'>
                          <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='brand-7' />
                            <label className='custom-control-label' htmlFor='brand-7'>
                              Nike
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='widget widget-collapsible'>
                  <h3 className='widget-title'>
                    <a
                      data-bs-toggle='collapse'
                      href='#widget-5'
                      role='button'
                      aria-expanded='true'
                      aria-controls='widget-5'
                    >
                      Price
                    </a>
                  </h3>
                  <div className='collapse show' id='widget-5'>
                    <div className='widget-body'>
                      <div className='filter-price'>
                        <div className='filter-price-text'>
                          Price Range:
                          <span id='filter-price-range' />
                        </div>
                        <Nouislider
                          start={[state.price[0], state.price[1]]}
                          connect={true}
                          step={50}
                          range={{
                            min: minPrice,
                            max: maxPrice,
                          }}
                          tooltips={[
                            {
                              from: (value) => {
                                return Number(String(value).replace(',-', ''));
                              },
                              to: (val) => {
                                return `$${val}`;
                              },
                            },
                            {
                              from: (value) => {
                                return Number(String(value).replace(',-', ''));
                              },
                              to: (val) => {
                                return `$${val}`;
                              },
                            },
                          ]}
                          onUpdate={handleChangePrices}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <button className={mergeClassNames(styles['sidebar-toggler'])} onClick={toggleMobileFilter}>
        <i className='icon-angle-right' />
      </button>
      <div
        className={mergeClassNames(styles['sidebar-overlay'], openMobileFilter ? styles['active'] : '')}
        onClick={toggleMobileFilter}
      />
    </Layout>
  );
};

export default Shopping;

export async function getServerSideProps(context: NextPageContext) {
  // const session = await getSession(context);

  const filterSizes = [
    {
      value: 'XS',
      name: 'XS',
    },
    {
      value: 'S',
      name: 'S',
    },
    {
      value: 'M',
      name: 'M',
    },
    {
      value: 'L',
      name: 'L',
    },
    {
      value: 'XL',
      name: 'XL',
    },
    {
      value: 'XXL',
      name: 'XXL',
    },
  ];

  const filterCategories = [
    { value: 'Dresses', name: 'Dresses' },
    { value: 'T-shirts', name: 'T-shirts' },
    { value: 'Bags', name: 'Bags' },
    { value: 'Jackets', name: 'Jackets' },
    { value: 'Shoes', name: 'Shoes' },
    { value: 'Jumpers', name: 'Jumpers' },
    { value: 'Jeans', name: 'Jeans' },
    { value: 'Sportwear', name: 'Sportwear' },
  ];

  const filterColors = [
    { value: '#b87145', name: 'b87145' },
    { value: '#f0c04a', name: 'f0c04a' },
    { value: '#333333', name: '333333' },
    { value: '#cc3333', name: 'cc3333' },
    { value: '#3399cc', name: '3399cc' },
    { value: '#669933', name: '669933' },
    { value: '#f2719c', name: 'f2719c' },
    { value: '#ebebeb', name: 'ebebeb' },
  ];

  const filterBrands = [
    { name: 'Next', value: 'Next' },
    { name: 'River Island', value: 'RiverIsland' },
    { name: 'Geox', value: 'Geox' },
    { name: 'New Balance', value: 'NewBalance' },
    { name: 'UGG', value: 'UGG' },
    { name: 'Nike', value: 'Nike' },
  ];

  const props: Props = {
    filterBrands,
    filterCategories,
    filterColors,
    filterSizes,
  };

  return {
    props,
  };
}

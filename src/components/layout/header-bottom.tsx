import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@contexts/cart';
import { useWishlist } from '@contexts/wishlist';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

import { CategoryProduct2 } from '../ecommerce/Filter/CategoryProduct2';
import { CategoryProduct3 } from '../ecommerce/Filter/CategoryProduct3';

interface Props {
  toggleClick: () => void;
}

export const HeaderBottom: React.FC<Props> = ({ toggleClick }) => {
  const { items } = useCart();
  const { products } = useWishlist();
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      <div className={mergeClassNames('header-bottom header-bottom-bg-color sticky-bar', scroll ? 'stick' : '')}>
        <div className='container'>
          <div className='header-wrap header-space-between position-relative'>
            <div className='logo logo-width-1 d-block d-lg-none'>
              <Link href='/'>
                <Image
                  width='0'
                  height='0'
                  sizes='100vw'
                  style={{ width: 'auto', height: 'auto' }}
                  src='/assets/imgs/theme/logo.svg'
                  alt='logo'
                />
              </Link>
            </div>
            <div className='header-nav d-none d-lg-flex'>
              <div className='main-categori-wrap d-none d-lg-block'>
                <a role='button' className='categories-button-active' onClick={handleToggle}>
                  <span className='fi-rs-apps' /> <span className='et'>Browse</span> All Categories
                  <i className='fi-rs-angle-down' />
                </a>
                <div
                  className={
                    isToggled
                      ? 'categories-dropdown-wrap categories-dropdown-active-large font-heading open'
                      : 'categories-dropdown-wrap categories-dropdown-active-large font-heading'
                  }
                >
                  <div className='d-flex categori-dropdown-inner'>
                    <CategoryProduct2 />
                    <CategoryProduct3 />
                  </div>
                  <div className='more_slide_open' style={{ display: 'none' }}>
                    <div className='d-flex categori-dropdown-inner'>
                      <ul>
                        <li>
                          <Link href='/products'>
                            {' '}
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/icons/icon-1.svg'
                              alt=''
                            />
                            Milks and Dairies
                          </Link>
                        </li>
                        <li>
                          <Link href='/products'>
                            {' '}
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/icons/icon-2.svg'
                              alt=''
                            />
                            Clothing & beauty
                          </Link>
                        </li>
                      </ul>
                      <ul className='end'>
                        <li>
                          <Link href='/products'>
                            {' '}
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/icons/icon-3.svg'
                              alt=''
                            />
                            Wines & Drinks
                          </Link>
                        </li>
                        <li>
                          <Link href='/products'>
                            {' '}
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/icons/icon-4.svg'
                              alt=''
                            />
                            Fresh Seafood
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='more_categories'>
                    <span className='icon' /> <span className='heading-sm-1'>Show more...</span>
                  </div>
                </div>
              </div>
              <div className='main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading'>
                <nav>
                  <ul>
                    <li className='hot-deals'>
                      <Image
                        width='0'
                        height='0'
                        sizes='100vw'
                        style={{ width: 'auto', height: 'auto' }}
                        src='/assets/imgs/theme/icons/icon-hot.svg'
                        alt='hot deals'
                      />
                      <Link href='/products'>Hot Deals</Link>
                    </li>
                    <li>
                      <Link href='/' className='active'>
                        Home<i className='fi-rs-angle-down'></i>
                      </Link>
                      <ul className='sub-menu'>
                        <li>
                          <Link href='/'>Home 1</Link>
                        </li>
                        <li>
                          <Link href='/index-2'>Home 2</Link>
                        </li>
                        <li>
                          <Link href='/index-3'>Home 3</Link>
                        </li>
                        <li>
                          <Link href='/index-4'>Home 4</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href='/page-about'>About</Link>
                    </li>
                    <li>
                      <Link href='/shop-grid-right'>
                        Shop
                        <i className='fi-rs-angle-down' />
                      </Link>
                      <ul className='sub-menu'>
                        <li>
                          <a href='shop-grid-right.html'>Shop Grid – Right Sidebar</a>
                        </li>
                        <li>
                          <a href='shop-grid-left.html'>Shop Grid – Left Sidebar</a>
                        </li>
                        <li>
                          <a href='shop-list-right.html'>Shop List – Right Sidebar</a>
                        </li>
                        <li>
                          <a href='shop-list-left.html'>Shop List – Left Sidebar</a>
                        </li>
                        <li>
                          <a href='shop-fullwidth.html'>Shop - Wide</a>
                        </li>
                        <li>
                          <a href='#'>
                            Single Product <i className='fi-rs-angle-right' />
                          </a>
                          <ul className='level-menu'>
                            <li>
                              <a href='shop-product-right.html'>Product – Right Sidebar</a>
                            </li>
                            <li>
                              <a href='shop-product-left.html'>Product – Left Sidebar</a>
                            </li>
                            <li>
                              <a href='shop-product-full.html'>Product – No sidebar</a>
                            </li>
                            <li>
                              <a href='shop-product-vendor.html'>Product – Vendor Infor</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href='shop-filter.html'>Shop – Filter</a>
                        </li>
                        <li>
                          <a href='shop-wishlist.html'>Shop – Wishlist</a>
                        </li>
                        <li>
                          <a href='shop-cart.html'>Shop – Cart</a>
                        </li>
                        <li>
                          <a href='shop-checkout.html'>Shop – Checkout</a>
                        </li>
                        <li>
                          <a href='shop-compare.html'>Shop – Compare</a>
                        </li>
                        <li>
                          <a href='#'>
                            Shop Invoice
                            <i className='fi-rs-angle-right' />
                          </a>
                          <ul className='level-menu'>
                            <li>
                              <a href='shop-invoice-1.html'>Shop Invoice 1</a>
                            </li>
                            <li>
                              <a href='shop-invoice-2.html'>Shop Invoice 2</a>
                            </li>
                            <li>
                              <a href='shop-invoice-3.html'>Shop Invoice 3</a>
                            </li>
                            <li>
                              <a href='shop-invoice-4.html'>Shop Invoice 4</a>
                            </li>
                            <li>
                              <a href='shop-invoice-5.html'>Shop Invoice 5</a>
                            </li>
                            <li>
                              <a href='shop-invoice-6.html'>Shop Invoice 6</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href='#'>
                        Vendors <i className='fi-rs-angle-down' />
                      </a>
                      <ul className='sub-menu'>
                        <li>
                          <Link href='/vendors'>Vendors Grid</Link>
                        </li>
                        <li>
                          <Link href='/vendors-list'>Vendors List</Link>
                        </li>
                        <li>
                          <Link href='/vendor-dashboard'>Vendor Dashboard</Link>
                        </li>
                        <li>
                          <Link href='/vendor-guide'>Vendor Guide</Link>
                        </li>
                      </ul>
                    </li>
                    <li className='position-static'>
                      <a href='#'>
                        Mega menu <i className='fi-rs-angle-down' />
                      </a>
                      <ul className='mega-menu'>
                        <li className='sub-mega-menu sub-mega-menu-width-22'>
                          <a className='menu-title' href='#'>
                            Fruit &amp; Vegetables
                          </a>
                          <ul>
                            <li>
                              <a href='shop-product-right.html'>Meat &amp; Poultry</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Fresh Vegetables</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Herbs &amp; Seasonings</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Cuts &amp; Sprouts</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Exotic Fruits &amp; Veggies</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Packaged Produce</a>
                            </li>
                          </ul>
                        </li>
                        <li className='sub-mega-menu sub-mega-menu-width-22'>
                          <a className='menu-title' href='#'>
                            Breakfast &amp; Dairy
                          </a>
                          <ul>
                            <li>
                              <a href='shop-product-right.html'>Milk &amp; Flavoured Milk</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Butter and Margarine</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Eggs Substitutes</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Marmalades</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Sour Cream</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Cheese</a>
                            </li>
                          </ul>
                        </li>
                        <li className='sub-mega-menu sub-mega-menu-width-22'>
                          <a className='menu-title' href='#'>
                            Meat &amp; Seafood
                          </a>
                          <ul>
                            <li>
                              <a href='shop-product-right.html'>Breakfast Sausage</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Dinner Sausage</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Chicken</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Sliced Deli Meat</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Wild Caught Fillets</a>
                            </li>
                            <li>
                              <a href='shop-product-right.html'>Crab and Shellfish</a>
                            </li>
                          </ul>
                        </li>
                        <li className='sub-mega-menu sub-mega-menu-width-34'>
                          <div className='menu-banner-wrap'>
                            <a href='shop-product-right.html'>
                              <Image
                                width='0'
                                height='0'
                                sizes='100vw'
                                style={{ width: 'auto', height: 'auto' }}
                                src='/assets/imgs/banner/banner-menu.png'
                                alt='hot deals'
                              />
                            </a>
                            <div className='menu-banner-content'>
                              <h4>Hot deals</h4>
                              <h3>
                                Don&lsquo;t miss
                                <br />
                                Trending
                              </h3>
                              <div className='menu-banner-price'>
                                <span className='new-price text-success'>Save to 50%</span>
                              </div>
                              <div className='menu-banner-btn'>
                                <a href='shop-product-right.html'>Shop now</a>
                              </div>
                            </div>
                            <div className='menu-banner-discount'>
                              <h3>
                                <span>25%</span>
                                off
                              </h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href='blog-category-grid.html'>
                        Blog <i className='fi-rs-angle-down' />
                      </a>
                      <ul className='sub-menu'>
                        <li>
                          <a href='blog-category-grid.html'>Blog Category Grid</a>
                        </li>
                        <li>
                          <a href='blog-category-list.html'>Blog Category List</a>
                        </li>
                        <li>
                          <a href='blog-category-big.html'>Blog Category Big</a>
                        </li>
                        <li>
                          <a href='blog-category-fullwidth.html'>Blog Category Wide</a>
                        </li>
                        <li>
                          <a href='#'>
                            Single Post <i className='fi-rs-angle-right' />
                          </a>
                          <ul className='level-menu level-menu-modify'>
                            <li>
                              <a href='blog-post-left.html'>Left Sidebar</a>
                            </li>
                            <li>
                              <a href='blog-post-right.html'>Right Sidebar</a>
                            </li>
                            <li>
                              <a href='blog-post-fullwidth.html'>No Sidebar</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href='#'>
                        Pages <i className='fi-rs-angle-down' />
                      </a>
                      <ul className='sub-menu'>
                        <li>
                          <a href='page-about.html'>About Us</a>
                        </li>
                        <li>
                          <a href='page-contact.html'>Contact</a>
                        </li>
                        <li>
                          <a href='page-account.html'>My Account</a>
                        </li>
                        <li>
                          <a href='page-login.html'>Login</a>
                        </li>
                        <li>
                          <a href='page-register.html'>Register</a>
                        </li>
                        <li>
                          <a href='page-forgot-password.html'>Forgot password</a>
                        </li>
                        <li>
                          <a href='page-reset-password.html'>Reset password</a>
                        </li>
                        <li>
                          <a href='page-purchase-guide.html'>Purchase Guide</a>
                        </li>
                        <li>
                          <a href='page-privacy-policy.html'>Privacy Policy</a>
                        </li>
                        <li>
                          <a href='page-terms.html'>Terms of Service</a>
                        </li>
                        <li>
                          <a href='page-404.html'>404 Page</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href='page-contact.html'>Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='hotline d-none d-lg-flex'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: 'auto', height: 'auto' }}
                src='/assets/imgs/theme/icons/icon-headphone.svg'
                alt='hotline'
              />
              <p>
                1900 - 888<span>24/7 Support Center</span>
              </p>
            </div>
            <div className='header-action-icon-2 d-block d-lg-none'>
              <div className='burger-icon burger-icon-white' onClick={toggleClick}>
                <span className='burger-icon-top' />
                <span className='burger-icon-mid' />
                <span className='burger-icon-bottom' />
              </div>
            </div>
            <div className='header-action-right d-block d-lg-none'>
              <div className='header-action-2'>
                <div className='header-action-icon-2'>
                  <Link href='/shop-wishlist'>
                    <Image
                      width='0'
                      height='0'
                      sizes='100vw'
                      style={{ width: 'auto', height: 'auto' }}
                      src='/assets/imgs/theme/icons/icon-heart.svg'
                      alt=''
                    />
                    <span className='pro-count white'>{products.length}</span>
                  </Link>
                </div>
                <div className='header-action-icon-2'>
                  <Link href='/shop-cart' className='mini-cart-icon'>
                    <Image
                      width='0'
                      height='0'
                      sizes='100vw'
                      style={{ width: 'auto', height: 'auto' }}
                      src='/assets/imgs/theme/icons/icon-cart.svg'
                      alt=''
                    />
                    <span className='pro-count white'>{items.length}</span>
                  </Link>
                  <div className='cart-dropdown-wrap cart-dropdown-hm2'>
                    <ul>
                      <li>
                        <div className='shopping-cart-img'>
                          <Link href='/shop-grid-right'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/shop/thumbnail-3.jpg'
                              alt=''
                            />
                          </Link>
                        </div>
                        <div className='shopping-cart-title'>
                          <h4>
                            <Link href='/shop-grid-right'>Plain Striola Shirts</Link>
                          </h4>
                          <h3>
                            <span>1 × </span>$800.00
                          </h3>
                        </div>
                        <div className='shopping-cart-delete'>
                          <Link href='/#'>
                            <i className='fi-rs-cross-small' />
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className='shopping-cart-img'>
                          <Link href='/shop-grid-right'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/shop/thumbnail-4.jpg'
                              alt=''
                            />
                          </Link>
                        </div>
                        <div className='shopping-cart-title'>
                          <h4>
                            <Link href='/shop-grid-right'>Macbook Pro 2022</Link>
                          </h4>
                          <h3>
                            <span>1 × </span>$3500.00
                          </h3>
                        </div>
                        <div className='shopping-cart-delete'>
                          <a href='#'>
                            <i className='fi-rs-cross-small' />
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div className='shopping-cart-footer'>
                      <div className='shopping-cart-total'>
                        <h4>
                          Total <span>$383.00</span>
                        </h4>
                      </div>
                      <div className='shopping-cart-button'>
                        <Link href='/shop-cart'>View cart</Link>
                        <Link href='/shop-checkout'>Checkout</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

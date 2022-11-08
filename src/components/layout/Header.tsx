import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Image from 'next/image';
import Link from 'next/link';

import { StoreState } from '@contexts/redux-store';

import { Search } from '../ecommerce/Search';
import { useSession } from 'next-auth/react';

interface Props {
  toggleClick: () => void;
  isToggled: boolean;
  headerStyle: string;
}

export const Header = ({ toggleClick }: Props) => {
  const { data: session } = useSession();
  const totalCartItems = useSelector<StoreState, number>((state) => state.cart.length);
  const totalCompareItems = useSelector<StoreState, number>((state) => state.compare.items.length);
  const totalWishlistItems = useSelector<StoreState, number>((state) => state.wishlist.items.length);

  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      <header className='header-area header-style-1 header-height-2'>
        <div className='mobile-promotion'>
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only <strong>3 days</strong> left
          </span>
        </div>
        <div className='header-top header-top-ptb-1 d-none d-lg-block'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-xl-3 col-lg-4'>
                <div className='header-info'>
                  <ul>
                    <li>
                      <Link href='/page-about'>About Us</Link>
                    </li>
                    <li>
                      <Link href='/page-account'>My Account</Link>
                    </li>
                    <li>
                      <Link href='/shop-wishlist'>Wishlist</Link>
                    </li>
                    <li>
                      <Link href='/page-account'>Order Tracking</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-6 col-lg-4'>
                <div className='text-center'>
                  <div id='news-flash' className='d-inline-block'>
                    <ul>
                      <li>
                        Get great devices up to 50% off
                        <Link href='/shop-grid-right'>View details</Link>
                      </li>
                      {/* <li>100% Secure delivery without contacting the courier</li>
                      <li>Supper Value Deals - Save more with coupons</li>
                      <li>Trendy 25silver jewelry, save up 35% off today</li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-4'>
                <div className='header-info header-info-right'>
                  <ul>
                    <li>
                      Need help? Call Us: <strong className='text-brand'> + 1800 900</strong>
                    </li>
                    <li>
                      <Link href='/#' className='language-dropdown-active'>
                        <i className='fi-rs-world'></i>English<i className='fi-rs-angle-small-down'></i>
                      </Link>
                      <ul className='language-dropdown'>
                        <li>
                          <Link href='/#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-fr.png'
                              alt=''
                            />
                            Français
                          </Link>
                        </li>
                        <li>
                          <Link href='/#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-dt.png'
                              alt=''
                            />
                            Deutsch
                          </Link>
                        </li>
                        <li>
                          <Link href='/#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-ru.png'
                              alt=''
                            />
                            Pусский
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className='language-dropdown-active' href='#'>
                        USD <i className='fi-rs-angle-small-down' />
                      </a>
                      <ul className='language-dropdown'>
                        <li>
                          <a href='#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-fr.png'
                              alt=''
                            />
                            INR
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-dt.png'
                              alt=''
                            />
                            MBP
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <Image
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: 'auto' }}
                              src='/assets/imgs/theme/flag-ru.png'
                              alt=''
                            />
                            EU
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='header-middle header-middle-ptb-1 d-none d-lg-block'>
          <div className='container'>
            <div className='header-wrap'>
              <div className='logo logo-width-1'>
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
              <div className='header-right'>
                <div className='search-style-2'>
                  <Search />
                </div>
                <div className='header-action-right'>
                  <div className='header-action-2'>
                    {/* <div className='search-location'>
                      <form action='#'>
                        <select className='select-active'>
                          <option>Your Location</option>
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>Arizona</option>
                          <option>Delaware</option>
                          <option>Florida</option>
                          <option>Georgia</option>
                          <option>Hawaii</option>
                          <option>Indiana</option>
                          <option>Maryland</option>
                          <option>Nevada</option>
                          <option>New Jersey</option>
                          <option>New Mexico</option>
                          <option>New York</option>
                        </select>
                      </form>
                    </div> */}
                    <Link href='/shop-compare' className='header-action-icon-2'>
                      <div className='action-icon'>
                        <Image
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '25px', height: 'auto' }}
                          className='svgInject'
                          src='/assets/imgs/theme/icons/icon-compare.svg'
                          alt=''
                        />
                        <span className='pro-count blue'>{totalCompareItems}</span>
                      </div>
                      <span className='lable'>Compare</span>
                    </Link>
                    <Link href='/shop-wishlist' className='header-action-icon-2'>
                      <div className='action-icon'>
                        <Image
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '25px', height: 'auto' }}
                          className='svgInject'
                          src='/assets/imgs/theme/icons/icon-heart.svg'
                          alt=''
                        />
                        <span className='pro-count blue'>{totalWishlistItems}</span>
                      </div>
                      <span className='lable'>Wishlist</span>
                    </Link>
                    <div className='header-action-icon-2 dropdown'>
                      <div className='action-icon' data-bs-toggle='dropdown' aria-expanded='false'>
                        <Image
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '25px', height: 'auto' }}
                          src='/assets/imgs/theme/icons/icon-cart.svg'
                          alt=''
                        />
                        <span className='pro-count blue'>{totalCartItems}</span>
                      </div>
                      <span className='lable' data-bs-toggle='dropdown' aria-expanded='false'>
                        Cart
                      </span>
                      <div className='cart-dropdown-wrap cart-dropdown-hm2 dropdown-menu dropdown-menu-lg-end'>
                        <ul>
                          <li>
                            <div className='shopping-cart-img'>
                              <a href='shop-product-right.html'>
                                <Image
                                  width='0'
                                  height='0'
                                  sizes='100vw'
                                  style={{ width: 'auto', height: 'auto' }}
                                  src='/assets/imgs/shop/thumbnail-3.jpg'
                                  alt=''
                                />
                              </a>
                            </div>
                            <div className='shopping-cart-title'>
                              <h4>
                                <a href='shop-product-right.html'>Daisy Casual Bag</a>
                              </h4>
                              <h4>
                                <span>1 × </span>$800.00
                              </h4>
                            </div>
                            <div className='shopping-cart-delete'>
                              <a href='#'>
                                <i className='fi-rs-cross-small' />
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className='shopping-cart-img'>
                              <a href='shop-product-right.html'>
                                <Image
                                  width='0'
                                  height='0'
                                  sizes='100vw'
                                  style={{ width: 'auto', height: 'auto' }}
                                  src='/assets/imgs/shop/thumbnail-2.jpg'
                                  alt=''
                                />
                              </a>
                            </div>
                            <div className='shopping-cart-title'>
                              <h4>
                                <a href='shop-product-right.html'>Corduroy Shirts</a>
                              </h4>
                              <h4>
                                <span>1 × </span>$3200.00
                              </h4>
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
                              Total <span>$4000.00</span>
                            </h4>
                          </div>
                          <div className='shopping-cart-button'>
                            <Link href='/cart' className='outline'>
                              View cart
                            </Link>
                            <Link href='/checkout'>Checkout</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='header-action-icon-2 dropdown'>
                      <div className='action-icon' data-bs-toggle='dropdown' aria-expanded='false'>
                        <Image
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '25px', height: 'auto' }}
                          src='/assets/imgs/theme/icons/icon-user.svg'
                          className='svgInject'
                          alt=''
                        />
                      </div>
                      <span className='lable ml-0' data-bs-toggle='dropdown' aria-expanded='false'>
                        Account
                      </span>
                      {/* <Link href='/page-account'>
                        <Image
                          width='0'
                          height='0'
                          sizes='100vw'
                          style={{ width: '25px', height: 'auto' }}
                          src='/assets/imgs/theme/icons/icon-user.svg'
                          className='svgInject'
                          alt=''
                        />
                      </Link>
                      <Link href='/page-account'>
                        <span className='lable ml-0'>Account</span>
                      </Link> */}
                      <div className='cart-dropdown-wrap cart-dropdown-hm2 account-dropdown dropdown-menu dropdown-menu-lg-end'>
                        <ul>
                          {session?.user && (
                            <>
                              <li>
                                <Link href='/page-account'>
                                  <i className='fi fi-rs-user mr-10'></i>My Account
                                </Link>
                              </li>
                              <li>
                                <Link href='/page-account'>
                                  <i className='fi fi-rs-location-alt mr-10'></i>Order Tracking
                                </Link>
                              </li>
                              <li>
                                <Link href='/page-account'>
                                  <i className='fi fi-rs-label mr-10'></i>My Voucher
                                </Link>
                              </li>
                            </>
                          )}
                          <li>
                            <Link href='/shop-wishlist'>
                              <i className='fi fi-rs-heart mr-10'></i>My Wishlist
                            </Link>
                          </li>
                          {session?.user && (
                            <>
                              <li>
                                <Link href='/page-account'>
                                  <i className='fi fi-rs-settings-sliders mr-10'></i>Setting
                                </Link>
                              </li>
                              <li>
                                <button>
                                  <i className='fi fi-rs-sign-out mr-10'></i>Sign out
                                </button>
                              </li>
                            </>
                          )}
                          {!session?.user && (
                            <>
                              <li>
                                <Link href='/login'>
                                  <i className='fi fi-rs-sign-in mr-10'></i>Login
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <HeaderBottom /> */}
      </header>
    </>
  );
};

import { useEffect, useRef, useState } from 'react';

import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Image } from '@components/image';
import { useAuth } from '@contexts/auth';
import { CartItem, useCart } from '@contexts/cart';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import styles from './styles.module.scss';
import { PlatformService } from '@contexts/platform';
import { useSettings } from '@contexts/settings';
import { useSession } from 'next-auth/react';
import { Button, ButtonLink } from '@components/button';
import { useWallet } from '@contexts/wallet';

interface Item {
  name: string;
  value: string;
}

const Header = () => {
  const platformService = new PlatformService();
  const stickyHeaderRef = useRef<HTMLDivElement>();
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const isLoginPage = router.pathname.endsWith('login');
  const { items, totalPrice, removeProduct } = useCart();
  const { logout, openAuthDialog, user } = useAuth();
  const { signer, network, connect: connectWallet } = useWallet();
  const { data: session, status } = useSession();
  const { currencies, languages, languageName, currencyName, changeCurrency, changeLanguage } = useSettings();

  const inputSearchRef = useRef<HTMLInputElement>();

  const handleSearch = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isOpenSearch) {
      setIsOpenSearch(true);
    } else {
    }
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleRemoveProduct = (item: CartItem) => {
    removeProduct(item);
  };

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  useEffect(() => {
    if (isOpenSearch) {
      inputSearchRef.current.focus();
    }
  }, [isOpenSearch]);

  useEffect(() => {
    const observer = () => {
      if (window.scrollY > 400) {
        if (!stickyHeaderRef.current.classList.contains('fixed')) {
          stickyHeaderRef.current.classList.add('fixed');
        }
      } else {
        stickyHeaderRef.current.classList.remove('fixed');
      }
    };
    if (platformService.isBrowser) {
      window.addEventListener('scroll', observer);
      observer();
    }

    return () => {
      if (platformService.isBrowser) {
        window.removeEventListener('scroll', observer);
      }
    };
  }, []);

  return (
    <>
      <div
        className={mergeClassNames(
          'mobile-menu-overlay',
          styles['mobile-menu-overlay'],
          openMobileMenu ? styles['mmenu-active'] : '',
        )}
        onClick={toggleMobileMenu}
      />
      <div className={mergeClassNames('mobile-menu-container', 'mobile-menu-light', styles['mobile-menu-container'])}>
        <div className='mobile-menu-wrapper'>
          <span role='button' className='mobile-menu-close' onClick={toggleMobileMenu}>
            <i className='icon-close' />
          </span>
          <form action='#' method='get' className='mobile-search'>
            <label htmlFor='mobile-search' className='visually-hidden'>
              Search
            </label>
            <input
              type='search'
              className='form-control'
              name='mobile-search'
              id='mobile-search'
              placeholder='Search product ...'
              required
            />
            <button className='btn btn-primary' type='submit'>
              <i className='icon-search' />
            </button>
          </form>
          <ul className='nav nav-pills-mobile nav-border-anim' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='mobile-menu-link'
                data-bs-toggle='tab'
                href='#mobile-menu-tab'
                role='tab'
                aria-controls='mobile-menu-tab'
                aria-selected='true'
              >
                Menu
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='mobile-cats-link'
                data-bs-toggle='tab'
                href='#mobile-cats-tab'
                role='tab'
                aria-controls='mobile-cats-tab'
                aria-selected='false'
              >
                Categories
              </a>
            </li>
          </ul>
          <div className='tab-content'>
            <div
              className='tab-pane fade show active'
              id='mobile-menu-tab'
              role='tabpanel'
              aria-labelledby='mobile-menu-link'
            >
              <nav className='mobile-nav'>
                <ul className='mobile-menu'>
                  <li className='active'>
                    <a href='index.html'>Home</a>
                    <ul>
                      <li>
                        <a href='index-1.html'>01 - furniture store</a>
                      </li>
                      <li>
                        <a href='index-2.html'>02 - furniture store</a>
                      </li>
                      <li>
                        <a href='index-3.html'>03 - electronic store</a>
                      </li>
                      <li>
                        <a href='index-4.html'>04 - electronic store</a>
                      </li>
                      <li>
                        <a href='index-5.html'>05 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-6.html'>06 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-7.html'>07 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-8.html'>08 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-9.html'>09 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-10.html'>10 - shoes store</a>
                      </li>
                      <li>
                        <a href='index-11.html'>11 - furniture simple store</a>
                      </li>
                      <li>
                        <a href='index-12.html'>12 - fashion simple store</a>
                      </li>
                      <li>
                        <a href='index-13.html'>13 - market</a>
                      </li>
                      <li>
                        <a href='index-14.html'>14 - market fullwidth</a>
                      </li>
                      <li>
                        <a href='index-15.html'>15 - lookbook 1</a>
                      </li>
                      <li>
                        <a href='index-16.html'>16 - lookbook 2</a>
                      </li>
                      <li>
                        <a href='index-17.html'>17 - fashion store</a>
                      </li>
                      <li>
                        <a href='index-18.html'>18 - fashion store (with sidebar)</a>
                      </li>
                      <li>
                        <a href='index-19.html'>19 - games store</a>
                      </li>
                      <li>
                        <a href='index-20.html'>20 - book store</a>
                      </li>
                      <li>
                        <a href='index-21.html'>21 - sport store</a>
                      </li>
                      <li>
                        <a href='index-22.html'>22 - tools store</a>
                      </li>
                      <li>
                        <a href='index-23.html'>23 - fashion left navigation store</a>
                      </li>
                      <li>
                        <a href='index-24.html'>24 - extreme sport store</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='category.html'>Shop</a>
                    <ul>
                      <li>
                        <a href='category-list.html'>Shop List</a>
                      </li>
                      <li>
                        <a href='category-2cols.html'>Shop Grid 2 Columns</a>
                      </li>
                      <li>
                        <a href='category.html'>Shop Grid 3 Columns</a>
                      </li>
                      <li>
                        <a href='category-4cols.html'>Shop Grid 4 Columns</a>
                      </li>
                      <li>
                        <a href='category-boxed.html'>
                          <span>
                            Shop Boxed No Sidebar<span className='tip tip-hot'>Hot</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href='category-fullwidth.html'>Shop Fullwidth No Sidebar</a>
                      </li>
                      <li>
                        <a href='product-category-boxed.html'>Product Category Boxed</a>
                      </li>
                      <li>
                        <a href='product-category-fullwidth.html'>
                          <span>
                            Product Category Fullwidth<span className='tip tip-new'>New</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href='cart.html'>Cart</a>
                      </li>
                      <li>
                        <a href='checkout.html'>Checkout</a>
                      </li>
                      <li>
                        <a href='wishlist.html'>Wishlist</a>
                      </li>
                      <li>
                        <a href='#'>Lookbook</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='product.html' className='sf-with-ul'>
                      Product
                    </a>
                    <ul>
                      <li>
                        <a href='product.html'>Default</a>
                      </li>
                      <li>
                        <a href='product-centered.html'>Centered</a>
                      </li>
                      <li>
                        <a href='product-extended.html'>
                          <span>
                            Extended Info<span className='tip tip-new'>New</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href='product-gallery.html'>Gallery</a>
                      </li>
                      <li>
                        <a href='product-sticky.html'>Sticky Info</a>
                      </li>
                      <li>
                        <a href='product-sidebar.html'>Boxed With Sidebar</a>
                      </li>
                      <li>
                        <a href='product-fullwidth.html'>Full Width</a>
                      </li>
                      <li>
                        <a href='product-masonry.html'>Masonry Sticky Info</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='#'>Pages</a>
                    <ul>
                      <li>
                        <a href='about.html'>About</a>
                        <ul>
                          <li>
                            <a href='about.html'>About 01</a>
                          </li>
                          <li>
                            <a href='about-2.html'>About 02</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href='contact.html'>Contact</a>
                        <ul>
                          <li>
                            <a href='contact.html'>Contact 01</a>
                          </li>
                          <li>
                            <a href='contact-2.html'>Contact 02</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href='login.html'>Login</a>
                      </li>
                      <li>
                        <a href='faq.html'>FAQs</a>
                      </li>
                      <li>
                        <a href='404.html'>Error 404</a>
                      </li>
                      <li>
                        <a href='coming-soon.html'>Coming Soon</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='blog.html'>Blog</a>
                    <ul>
                      <li>
                        <a href='blog.html'>Classic</a>
                      </li>
                      <li>
                        <a href='blog-listing.html'>Listing</a>
                      </li>
                      <li>
                        <a href='#'>Grid</a>
                        <ul>
                          <li>
                            <a href='blog-grid-2cols.html'>Grid 2 columns</a>
                          </li>
                          <li>
                            <a href='blog-grid-3cols.html'>Grid 3 columns</a>
                          </li>
                          <li>
                            <a href='blog-grid-4cols.html'>Grid 4 columns</a>
                          </li>
                          <li>
                            <a href='blog-grid-sidebar.html'>Grid sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href='#'>Masonry</a>
                        <ul>
                          <li>
                            <a href='blog-masonry-2cols.html'>Masonry 2 columns</a>
                          </li>
                          <li>
                            <a href='blog-masonry-3cols.html'>Masonry 3 columns</a>
                          </li>
                          <li>
                            <a href='blog-masonry-4cols.html'>Masonry 4 columns</a>
                          </li>
                          <li>
                            <a href='blog-masonry-sidebar.html'>Masonry sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href='#'>Mask</a>
                        <ul>
                          <li>
                            <a href='blog-mask-grid.html'>Blog mask grid</a>
                          </li>
                          <li>
                            <a href='blog-mask-masonry.html'>Blog mask masonry</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href='#'>Single Post</a>
                        <ul>
                          <li>
                            <a href='single.html'>Default with sidebar</a>
                          </li>
                          <li>
                            <a href='single-fullwidth.html'>Fullwidth no sidebar</a>
                          </li>
                          <li>
                            <a href='single-fullwidth-sidebar.html'>Fullwidth with sidebar</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='elements-list.html'>Elements</a>
                    <ul>
                      <li>
                        <a href='elements-products.html'>Products</a>
                      </li>
                      <li>
                        <a href='elements-typography.html'>Typography</a>
                      </li>
                      <li>
                        <a href='elements-titles.html'>Titles</a>
                      </li>
                      <li>
                        <a href='elements-banners.html'>Banners</a>
                      </li>
                      <li>
                        <a href='elements-product-category.html'>Product Category</a>
                      </li>
                      <li>
                        <a href='elements-video-banners.html'>Video Banners</a>
                      </li>
                      <li>
                        <a href='elements-buttons.html'>Buttons</a>
                      </li>
                      <li>
                        <a href='elements-accordions.html'>Accordions</a>
                      </li>
                      <li>
                        <a href='elements-tabs.html'>Tabs</a>
                      </li>
                      <li>
                        <a href='elements-testimonials.html'>Testimonials</a>
                      </li>
                      <li>
                        <a href='elements-blog-posts.html'>Blog Posts</a>
                      </li>
                      <li>
                        <a href='elements-portfolio.html'>Portfolio</a>
                      </li>
                      <li>
                        <a href='elements-cta.html'>Call to Action</a>
                      </li>
                      <li>
                        <a href='elements-icon-boxes.html'>Icon Boxes</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div className='tab-pane fade' id='mobile-cats-tab' role='tabpanel' aria-labelledby='mobile-cats-link'>
              <nav className='mobile-cats-nav'>
                <ul className='mobile-cats-menu'>
                  <li>
                    <a className='mobile-cats-lead' href='#'>
                      Daily offers
                    </a>
                  </li>
                  <li>
                    <a className='mobile-cats-lead' href='#'>
                      Gift Ideas
                    </a>
                  </li>
                  <li>
                    <a href='#'>Beds</a>
                  </li>
                  <li>
                    <a href='#'>Lighting</a>
                  </li>
                  <li>
                    <a href='#'>Sofas &amp; Sleeper sofas</a>
                  </li>
                  <li>
                    <a href='#'>Storage</a>
                  </li>
                  <li>
                    <a href='#'>Armchairs &amp; Chaises</a>
                  </li>
                  <li>
                    <a href='#'>Decoration </a>
                  </li>
                  <li>
                    <a href='#'>Kitchen Cabinets</a>
                  </li>
                  <li>
                    <a href='#'>Coffee &amp; Tables</a>
                  </li>
                  <li>
                    <a href='#'>Outdoor Furniture </a>
                  </li>
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className='social-icons'>
            <a href='#' className='social-icon' target='_blank' title='Facebook'>
              <i className='icon-facebook-f' />
            </a>
            <a href='#' className='social-icon' target='_blank' title='Twitter'>
              <i className='icon-twitter' />
            </a>
            <a href='#' className='social-icon' target='_blank' title='Instagram'>
              <i className='icon-instagram' />
            </a>
            <a href='#' className='social-icon' target='_blank' title='Youtube'>
              <i className='icon-youtube' />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>

      <header className='header header-2 header-intro-clearance'>
        <div className='header-top'>
          <div className='container'>
            <div className='header-left'>
              <a href='tel:#'>
                <i className='icon-phone' />
                Call: +0123 456 789
              </a>
            </div>
            <div className='header-right'>
              <ul className='top-menu'>
                <li>
                  <a href='#'>Links</a>
                  <ul className='dropdown-links'>
                    <li>
                      <div className='header-dropdown'>
                        <span>{currencyName}</span>
                        <div className='header-menu'>
                          <ul>
                            {currencies.map((item) => (
                              <li key={item.value}>
                                <span role='button' onClick={() => changeCurrency(item.value)}>
                                  {item.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='header-dropdown'>
                        <span>{languageName}</span>
                        <div className='header-menu'>
                          <ul>
                            {languages.map((item) => (
                              <li key={item.value}>
                                <span role='button' onClick={() => changeLanguage(item.value)}>
                                  {item.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span
                        role='button'
                        onClick={() => {
                          if (status === 'authenticated') {
                            logout();
                          } else {
                            openAuthDialog();
                          }
                        }}
                      >
                        {status === 'authenticated' ? 'Log out' : 'Sign in / Sign up'}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='header-middle'>
          <div className='container'>
            <div className='header-left'>
              <button className='mobile-menu-toggler' onClick={toggleMobileMenu}>
                <span className='visually-hidden'>Toggle mobile menu</span>
                <i className='icon-bars' />
              </button>
              <Link href={{ pathname: '/' }}>
                <a className='logo'>
                  <NextImage src='/assets/images/demos/demo-2/logo.png' alt='Molla Logo' width={105} height={25} />
                </a>
              </Link>
            </div>
            <div className='header-center'>
              <div className='header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block'>
                <a href='#' className='search-toggle' role='button'>
                  <i className='icon-search' />
                </a>
                <form action='#' method='get'>
                  <div className='header-search-wrapper search-wrapper-wide'>
                    <label htmlFor='q' className='visually-hidden'>
                      Search
                    </label>
                    <input
                      type='search'
                      className='form-control'
                      name='q'
                      id='q'
                      placeholder='Search product ...'
                      required
                    />
                    <button className='btn btn-primary' type='submit'>
                      <i className='icon-search' />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='header-right'>
              <div className={mergeClassNames(styles['header-dropdown-link'])}>
                <div className='account dropdown cart-dropdown'>
                  <span title='My account'>
                    <div className='icon'>
                      <i className='icon-user' />
                    </div>
                    <p>Account</p>
                  </span>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <div>
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                    <div className='dropdown-cart-action'>
                      <div className='row'>
                        <div className='col-6'>
                          <Button
                            type='button'
                            fillType='filled'
                            cornerType='rounded'
                            themeType='primary'
                            onClick={connectWallet}
                          >
                            Connect wallet
                          </Button>
                        </div>
                        <div className='col-6'>
                          <Button
                            type='button'
                            fillType='filled'
                            cornerType='rounded'
                            themeType='primary'
                            onClick={logout}
                          >
                            <span>Log out</span>
                            <i className='icon-long-arrow-right ms-3' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={mergeClassNames('wishlist')}>
                  <a href='wishlist.html' title='Wishlist'>
                    <div className='icon'>
                      <i className='icon-heart-o' />
                      <span className={mergeClassNames('wishlist-count', styles['wishlist-count'])}>3</span>
                    </div>
                    <p>Wishlist</p>
                  </a>
                </div>
                <div className='dropdown cart-dropdown'>
                  <a
                    href='#'
                    className='dropdown-toggle'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    data-display='static'
                  >
                    <div className='icon'>
                      <i className='icon-shopping-cart' />
                      <span className='cart-count'>2</span>
                    </div>
                    <p>{totalPrice ? '$ 164.00' : 'Cart'}</p>
                  </a>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <div className='dropdown-cart-products'>
                      <div className='product'>
                        <div className='product-cart-details'>
                          <h4 className='product-title'>
                            <a href='product.html'>Beige knitted elastic runner shoes</a>
                          </h4>
                          <span className='cart-product-info'>
                            <span className='cart-product-qty'>1</span>x $84.00
                          </span>
                        </div>
                        <figure className='product-image-container'>
                          <a href='product.html' className='product-image'>
                            <Image src='/assets/images/products/product-1.jpg' alt='product' responsive={false} />
                          </a>
                        </figure>
                        <a href='#' className='btn-remove' title='Remove Product'>
                          <i className='icon-close' />
                        </a>
                      </div>
                      <div className='product'>
                        <div className='product-cart-details'>
                          <h4 className='product-title'>
                            <a href='product.html'>Blue utility pinafore denim dress</a>
                          </h4>
                          <span className='cart-product-info'>
                            <span className='cart-product-qty'>1</span>x $76.00
                          </span>
                        </div>
                        <figure className='product-image-container'>
                          <a href='product.html' className='product-image'>
                            <Image src='/assets/images/products/product-1.jpg' alt='product' responsive={false} />
                          </a>
                        </figure>
                        <a href='#' className='btn-remove' title='Remove Product'>
                          <i className='icon-close' />
                        </a>
                      </div>
                    </div>
                    <div className='dropdown-cart-total'>
                      <span>Total</span>
                      <span className='cart-total-price'>$160.00</span>-
                    </div>
                    <div className='dropdown-cart-action'>
                      <ButtonLink href='/cart' fillType='filled'>
                        View Cart
                      </ButtonLink>
                      <ButtonLink href='/checkout' fillType='outline'>
                        <span>Checkout</span>
                        <i className='icon-long-arrow-right ms-3' />
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='account'>
                <a href='dashboard.html' title='My account'>
                  <div className='icon'>
                    <i className='icon-user' />
                  </div>
                  <p>Account</p>
                </a>
              </div>
              <div className='wishlist'>
                <a href='wishlist.html' title='Wishlist'>
                  <div className='icon'>
                    <i className='icon-heart-o' />
                    <span className='wishlist-count badge'>3</span>
                  </div>
                  <p>Wishlist</p>
                </a>
              </div>
              <div className='dropdown cart-dropdown'>
                <a
                  href='#'
                  className='dropdown-toggle'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  data-display='static'
                >
                  <div className='icon'>
                    <i className='icon-shopping-cart' />
                    <span className='cart-count'>2</span>
                  </div>
                  <p>Cart</p>
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                  <div className='dropdown-cart-products'>
                    <div className='product'>
                      <div className='product-cart-details'>
                        <h4 className='product-title'>
                          <a href='product.html'>Beige knitted elastic runner shoes</a>
                        </h4>
                        <span className='cart-product-info'>
                          <span className='cart-product-qty'>1</span>x $84.00
                        </span>
                      </div>
                      <figure className='product-image-container'>
                        <a href='product.html' className='product-image'>
                          <Image src='/assets/images/products/product-1.jpg' alt='product' />
                        </a>
                      </figure>
                      <a href='#' className='btn-remove' title='Remove Product'>
                        <i className='icon-close' />
                      </a>
                    </div>
                    <div className='product'>
                      <div className='product-cart-details'>
                        <h4 className='product-title'>
                          <a href='product.html'>Blue utility pinafore denim dress</a>
                        </h4>
                        <span className='cart-product-info'>
                          <span className='cart-product-qty'>1</span>x $76.00
                        </span>
                      </div>
                      <figure className='product-image-container'>
                        <a href='product.html' className='product-image'>
                          <Image src='/assets/images/products/product-1.jpg' alt='product' />
                        </a>
                      </figure>
                      <a href='#' className='btn-remove' title='Remove Product'>
                        <i className='icon-close' />
                      </a>
                    </div>
                  </div>
                  <div className='dropdown-cart-total'>
                    <span>Total</span>
                    <span className='cart-total-price'>$160.00</span>
                  </div>
                  <div className='dropdown-cart-action'>
                    <a href='cart.html' className='btn btn-primary'>
                      View Cart
                    </a>
                    <a href='checkout.html' className='btn btn-outline-primary-2'>
                      <span>Checkout</span>
                      <i className='icon-long-arrow-right' />
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div ref={stickyHeaderRef} className='header-bottom sticky-header'>
          <div className='container'>
            <div className='header-left'>
              <div className='dropdown category-dropdown'>
                <a
                  href='#'
                  className='dropdown-toggle'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  data-display='static'
                  title='Browse Categories'
                >
                  Browse Categories
                </a>
                <div className='dropdown-menu'>
                  <nav className='side-nav'>
                    <ul className='menu-vertical sf-arrows'>
                      <li className='item-lead'>
                        <a href='#'>Daily offers</a>
                      </li>
                      <li className='item-lead'>
                        <a href='#'>Gift Ideas</a>
                      </li>
                      <li>
                        <a href='#'>Beds</a>
                      </li>
                      <li>
                        <a href='#'>Lighting</a>
                      </li>
                      <li>
                        <a href='#'>Sofas &amp; Sleeper sofas</a>
                      </li>
                      <li>
                        <a href='#'>Storage</a>
                      </li>
                      <li>
                        <a href='#'>Armchairs &amp; Chaises</a>
                      </li>
                      <li>
                        <a href='#'>Decoration </a>
                      </li>
                      <li>
                        <a href='#'>Kitchen Cabinets</a>
                      </li>
                      <li>
                        <a href='#'>Coffee &amp; Tables</a>
                      </li>
                      <li>
                        <a href='#'>Outdoor Furniture </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className='header-center'>
              <nav className='main-nav'>
                <ul className='menu sf-arrows'>
                  <li className='megamenu-container active'>
                    <a href='index.html' className='sf-with-ul'>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href='category.html' className='sf-with-ul'>
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href='product.html' className='sf-with-ul'>
                      Product
                    </a>
                  </li>
                  <li>
                    <a href='#' className='sf-with-ul'>
                      Pages
                    </a>
                  </li>
                  <li>
                    <a href='blog.html' className='sf-with-ul'>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href='elements-list.html' className='sf-with-ul'>
                      Elements
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='header-right'>
              <i className='la la-lightbulb-o' />
              <p>
                Clearance<span className='highlight'>&nbsp;Up to 30% Off</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* <header className='header'>
        <div className='header-top'>
          <div className='container'>
            <div className='header-left'>
              <div className='header-dropdown'>
                <a href='#'>Usd</a>
                <div className='header-menu'>
                  <ul>
                    <li>
                      <a href='#'>Eur</a>
                    </li>
                    <li>
                      <a href='#'>Usd</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='header-dropdown'>
                <a href='#'>Eng</a>
                <div className='header-menu'>
                  <ul>
                    <li>
                      <a href='#'>English</a>
                    </li>
                    <li>
                      <a href='#'>French</a>
                    </li>
                    <li>
                      <a href='#'>Spanish</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='header-right'>
              <ul className='top-menu'>
                <li>
                  <a href='#'>Links</a>
                  <ul>
                    <li>
                      <a href='tel:#'>
                        <i className='icon-phone' />
                        Call: +0123 456 789
                      </a>
                    </li>
                    <li>
                      <a href='wishlist.html'>
                        <i className='icon-heart-o' />
                        Wishlist <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href='about.html'>About Us</a>
                    </li>
                    <li>
                      <a href='contact.html'>Contact Us</a>
                    </li>
                    {!user && (
                      <li>
                        <button
                          className={mergeClassNames('border-0', 'bg-transparent', 'p-0')}
                          onClick={openAuthDialog}
                        >
                          <i className='icon-user' />
                          Login
                        </button>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='header-middle sticky-header'>
          <div className='container'>
            <div className='header-left'>
              <button className='mobile-menu-toggler'>
                <span className='visually-hidden'>Toggle mobile menu</span>
                <i className='icon-bars' />
              </button>
              <Link href='/'>
                <a className='logo'>
                  <NextImage src='/assets/images/logo.png' alt='Molla Logo' width={105} height={25} />
                </a>
              </Link>
            </div>
            <div className='header-right'>
              <div className='header-search'>
                <button
                  className={mergeClassNames(
                    'search-toggle',
                    'border-0',
                    'bg-transparent',
                    'p-0',
                    isOpenSearch ? 'active' : '',
                  )}
                  type='button'
                  title='Search'
                  onClick={handleSearch}
                >
                  <i className='icon-search' />
                </button>
                <form noValidate onSubmit={submitSearch}>
                  <div className={mergeClassNames('header-search-wrapper', isOpenSearch ? 'show' : '')}>
                    <label htmlFor='search' className='visually-hidden'>
                      Search
                    </label>
                    <input
                      ref={inputSearchRef}
                      type='search'
                      className='form-control'
                      name='search'
                      id='search'
                      placeholder='Search in...'
                    />
                  </div>
                </form>
              </div>
              <div className='dropdown cart-dropdown'>
                <button
                  className='dropdown-toggle border-0 bg-transparent p-0'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  data-display='static'
                >
                  <i className='icon-shopping-cart' />
                  <span className='cart-count'>{items.length}</span>
                </button>
                <div className='dropdown-menu dropdown-menu-right'>
                  <div className='dropdown-cart-products'>
                    {items.map((item) => (
                      <div key={item.product.id} className='product'>
                        <div className='product-cart-details'>
                          <h4 className='product-title'>
                            <Link href={{ pathname: `/products/${item.product.id}` }}>
                              <a>{item.product.title}</a>
                            </Link>
                          </h4>
                          <span className='cart-product-info'>
                            <span className='cart-product-qty'>{item.quantity}</span>x ${item.product.price}
                          </span>
                        </div>
                        <figure className='product-image-container'>
                          <a href='product.html' className='product-image'>
                            <Image src={item.product.images[0]} alt='product' responsive={false} />
                          </a>
                        </figure>
                        <button
                          type='button'
                          className='btn-remove border-0 bg-transparent p-0'
                          title='Remove Product'
                          onClick={() => handleRemoveProduct(item)}
                        >
                          <i className='icon-close' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='dropdown-cart-total'>
                    <span>Total</span>
                    <span className='cart-total-price'>${totalPrice}</span>
                  </div>
                  <div className='dropdown-cart-action'>
                    <Link href={{ pathname: 'cart' }}>
                      <a className='btn btn-primary'>View Cart</a>
                    </Link>
                    <Link href={{ pathname: 'checkout' }}>
                      <a className='btn btn-outline-primary-2'>
                        <span>Checkout</span>
                        <i className='icon-long-arrow-right' />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              {user && (
                <div className='dropdown cart-dropdown'>
                  <button
                    className='dropdown-toggle border-0 bg-transparent p-0'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    data-display='static'
                  >
                    <i className='icon-user' />
                  </button>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <div className='dropdown-cart-action'>
                        <button type='button' className='btn btn-outline-primary-2' onClick={logout}>
                          <span>Log out</span>
                          <i className='icon-long-arrow-right' />
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> */}
    </>
  );
};

export { Header };

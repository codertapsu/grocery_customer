import { Layout } from '@components/layout';
import Seo from '@components/seo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Breadcrumb } from '@components/breadcrumb';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Layout>
      <Seo />
      <div className='page-header text-center' style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}>
        <div className='container'>
          <h1 className='page-title'>
            Boxed No Sidebar<span>Shop</span>
          </h1>
        </div>
      </div>
      <Breadcrumb />
      <div className='page-content'>
        <div className='container'>
          <div className='toolbox'>
            <div className='toolbox-left'>
              <a href='#' className='sidebar-toggler'>
                <i className='icon-bars' />
                Filters
              </a>
            </div>
            <div className='toolbox-center'>
              <div className='toolbox-info'>
                Showing <span>12 of 56</span> Products
              </div>
            </div>
            <div className='toolbox-right'>
              <div className='toolbox-sort'>
                <label htmlFor='sortby'>Sort by:</label>
                <div className='select-custom'>
                  <select name='sortby' id='sortby' className='form-control'>
                    <option value='popularity' selected={true}>
                      Most Popular
                    </option>
                    <option value='rating'>Most Rated</option>
                    <option value='date'>Date</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='products'>
            <div className='row'>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <span className='product-label label-new'>New</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-1.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Women</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Nunc dignissim risus</a>
                    </h3>
                    <div className='product-price'>$50.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '0%' }} />
                      </div>
                      <span className='ratings-text'>( 0 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' style={{ background: '#cc9966' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' className='active' style={{ background: '#ebebeb' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-2.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Accessories</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Cras ornare tristique</a>
                    </h3>
                    <div className='product-price'>$32.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '80%' }} />
                      </div>
                      <span className='ratings-text'>( 11 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <span className='product-label label-sale'>30% off</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-3.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Women</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Aliquam tincidunt mauris</a>
                    </h3>
                    <div className='product-price'>
                      <span className='new-price'>$50.00</span>
                      <span className='old-price'>$84.00</span>
                    </div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '40%' }} />
                      </div>
                      <span className='ratings-text'>( 4 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#cc9966' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#7fc5ed' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#e8c97a' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-4.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Dresses</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Brown paperbag waist pencil skirt</a>
                    </h3>
                    <div className='product-price'>$60.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '20%' }} />
                      </div>
                      <span className='ratings-text'>( 2 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#cc9966' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#333333' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#7b5d36' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-5.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
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
                    <div className='product-nav product-nav-dots'>
                      <a href='#' style={{ background: '#ebebeb' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' className='active' style={{ background: '#eabc4e' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <span className='product-label label-out'>Out of stock</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-6.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Jackets</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Khaki utility boiler jumpsuit</a>
                    </h3>
                    <div className='product-price'>
                      <span className='out-price'>$120.00</span>
                    </div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '80%' }} />
                      </div>
                      <span className='ratings-text'>( 6 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-7.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Jeans</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Blue utility pinafore denim dress</a>
                    </h3>
                    <div className='product-price'>$76.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '20%' }} />
                      </div>
                      <span className='ratings-text'>( 2 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-8.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Shoes</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Beige knitted elastic runner shoes</a>
                    </h3>
                    <div className='product-price'>$84.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '0%' }} />
                      </div>
                      <span className='ratings-text'>( 0 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#d8c5b0' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#333333' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-9.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Bags</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Orange saddle lock front chain cross body bag</a>
                    </h3>
                    <div className='product-price'>$52.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '60%' }} />
                      </div>
                      <span className='ratings-text'>( 1 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#e07a3d' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#7b5d36' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#dac1a7' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <span className='product-label label-new'>New</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-10.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Jumpers</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Yellow button front tea top</a>
                    </h3>
                    <div className='product-price'>$56.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '0%' }} />
                      </div>
                      <span className='ratings-text'>( 0 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <span className='product-label label-top'>Top</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-11.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Shoes</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Light brown studded Wide fit wedges</a>
                    </h3>
                    <div className='product-price'>$110.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '20%' }} />
                      </div>
                      <span className='ratings-text'>( 2 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#cc9966' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#333333' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#dac1a7' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-md-4 col-lg-4 col-xl-3'>
                <div className='product'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-12.jpg'
                        alt='Product image'
                        title=''
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className='product-action action-icon-top'>
                      <a href='#' className='btn-product btn-cart'>
                        <span>add to cart</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product btn-quickview' title='Quick view'>
                        <span>quick view</span>
                      </a>
                      <a href='#' className='btn-product btn-compare' title='Compare'>
                        <span>compare</span>
                      </a>
                    </div>
                  </figure>
                  <div className='product-body'>
                    <div className='product-cat'>
                      <a href='#'>Bags</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Black soft RI weekend travel bag</a>
                    </h3>
                    <div className='product-price'>$68.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '0%' }} />
                      </div>
                      <span className='ratings-text'>( 0 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='load-more-container text-center'>
              <a href='#' className='btn btn-outline-darker btn-load-more'>
                More Products <i className='icon-refresh' />
              </a>
            </div>
          </div>
          <div className='sidebar-filter-overlay' />
          <aside className='sidebar-shop sidebar-filter'>
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
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-1' />
                          <label className='custom-control-label' htmlFor='cat-1'>
                            Dresses
                          </label>
                        </div>
                        <span className='item-count'>3</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-2' />
                          <label className='custom-control-label' htmlFor='cat-2'>
                            T-shirts
                          </label>
                        </div>
                        <span className='item-count'>0</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-3' />
                          <label className='custom-control-label' htmlFor='cat-3'>
                            Bags
                          </label>
                        </div>
                        <span className='item-count'>4</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-4' />
                          <label className='custom-control-label' htmlFor='cat-4'>
                            Jackets
                          </label>
                        </div>
                        <span className='item-count'>2</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-5' />
                          <label className='custom-control-label' htmlFor='cat-5'>
                            Shoes
                          </label>
                        </div>
                        <span className='item-count'>2</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-6' />
                          <label className='custom-control-label' htmlFor='cat-6'>
                            Jumpers
                          </label>
                        </div>
                        <span className='item-count'>1</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-7' />
                          <label className='custom-control-label' htmlFor='cat-7'>
                            Jeans
                          </label>
                        </div>
                        <span className='item-count'>1</span>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='cat-8' />
                          <label className='custom-control-label' htmlFor='cat-8'>
                            Sportwear
                          </label>
                        </div>
                        <span className='item-count'>0</span>
                      </div>
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
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='size-1' />
                          <label className='custom-control-label' htmlFor='size-1'>
                            XS
                          </label>
                        </div>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='size-2' />
                          <label className='custom-control-label' htmlFor='size-2'>
                            S
                          </label>
                        </div>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' defaultChecked id='size-3' />
                          <label className='custom-control-label' htmlFor='size-3'>
                            M
                          </label>
                        </div>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' defaultChecked id='size-4' />
                          <label className='custom-control-label' htmlFor='size-4'>
                            L
                          </label>
                        </div>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='size-5' />
                          <label className='custom-control-label' htmlFor='size-5'>
                            XL
                          </label>
                        </div>
                      </div>
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='size-6' />
                          <label className='custom-control-label' htmlFor='size-6'>
                            XXL
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
                    href='#widget-3'
                    role='button'
                    aria-expanded='true'
                    aria-controls='widget-3'
                  >
                    Colour
                  </a>
                </h3>
                <div className='collapse show' id='widget-3'>
                  <div className='widget-body'>
                    <div className='filter-colors'>
                      <a href='#' style={{ background: '#b87145' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#f0c04a' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#333333' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' className='selected' style={{ background: '#cc3333' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#3399cc' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#669933' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#f2719c' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
                      <a href='#' style={{ background: '#ebebeb' }}>
                        <span className='visually-hidden'>Color Name</span>
                      </a>
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
                      <div className='filter-item'>
                        <div className='custom-control custom-checkbox'>
                          <input type='checkbox' className='custom-control-input' id='brand-1' />
                          <label className='custom-control-label' htmlFor='brand-1'>
                            Next
                          </label>
                        </div>
                      </div>
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
                      <div id='price-slider' />
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
}

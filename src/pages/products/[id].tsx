import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@components/button';
import { Image } from '@components/image';
import { Layout } from '@components/layout';
import { QuantityInput } from '@components/quantity-input';
import { useCart } from '@contexts/cart';
import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { Product as ProductModel } from '@models/product.model';
import { PageHeader } from '@components/page-header';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

enum Tab {
  ProductDesc = 'product-desc',
  ProductInfo = 'product-info',
  ProductShipping = 'product-shipping',
  ProductReview = 'product-review',
}

const images = [
  '/assets/images/products/single/sidebar-gallery/1-big.jpg',
  '/assets/images/products/single/sidebar-gallery/2-big.jpg',
  '/assets/images/products/single/sidebar-gallery/3-big.jpg',
  '/assets/images/products/single/sidebar-gallery/4-big.jpg',
  '/assets/images/products/single/sidebar-gallery/1-big.jpg',
  '/assets/images/products/single/sidebar-gallery/2-big.jpg',
  '/assets/images/products/single/sidebar-gallery/3-big.jpg',
];

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<ProductModel>();
  const [activeTab, setActiveTab] = useState<Tab>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { id } = router.query;

  const addToCart = () => {
    addProduct({
      product,
      quantity,
    });
  };

  const buyProduct = () => {
    //
  };

  useEffect(() => {
    const onHashChangeStart = (urlPath: string) => {
      const hash = new URL(`${window.origin}${urlPath}`).hash.replace('#', '');
      setActiveTab(hash as Tab);
    };
    router.events.on('hashChangeStart', onHashChangeStart);

    const hash = new URL(window.location.href).hash.replace('#', '');
    setActiveTab((hash || Tab.ProductDesc) as Tab);

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart);
    };
  }, [router.events]);

  return (
    <Layout>
      <PageHeader backgroundImage={'url("/assets/images/page-header-bg.jpg")'}>
        Products<span>Shop</span>
      </PageHeader>
      {/* <Breadcrumb items={[{ href: '', name: 'Faq' }]} /> */}
      <div className='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9'>
              <div className='product-details-top'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='product-gallery'>
                      <figure className='product-main-image'>
                        <span className='product-label label-top'>Top {activeImageIndex}</span>
                        <Image src={images[activeImageIndex]} alt='product image' />
                        <a href='#' id='btn-product-gallery' className='btn-product-gallery'>
                          <i className='icon-arrows' />
                        </a>
                      </figure>
                      <div id='product-zoom-gallery' className='product-image-gallery'>
                        <OwlCarousel items={4}>
                          {images.map((item, index) => (
                            <span
                              key={index}
                              data-index={index}
                              data-active-index={activeImageIndex}
                              className={mergeClassNames(
                                'product-gallery-item',
                                activeImageIndex == index ? 'active' : '',
                              )}
                              role='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log({ index, activeImageIndex });

                                setActiveImageIndex(index);
                              }}
                            >
                              <Image src={item} alt='product side' />
                            </span>
                          ))}
                        </OwlCarousel>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='product-details product-details-sidebar'>
                      <h1 className='product-title'>Black faux leather chain trim sandals</h1>
                      <div className='ratings-container'>
                        <div className='ratings'>
                          <div className='ratings-val' style={{ width: '80%' }} />
                        </div>
                        <a className='ratings-text' href='#product-review-link' id='review-link'>
                          ( 2 Reviews )
                        </a>
                      </div>
                      <div className='product-price'>$90.00</div>
                      <div className='product-content'>
                        <p>
                          Sed egestas, ante et vulputate volutpat, eros semper est, vitae luctus metus libero eu augue.
                        </p>
                      </div>
                      <div className='details-filter-row details-row-size'>
                        <label>Color:</label>
                        <div className='product-nav product-nav-dots'>
                          <a href='#' className='active' style={{ background: '#333333' }}>
                            <span className='visually-hidden'>Color name</span>
                          </a>
                          <a href='#' style={{ background: '#efe7db' }}>
                            <span className='visually-hidden'>Color name</span>
                          </a>
                        </div>
                      </div>
                      <div className='details-filter-row details-row-size'>
                        <label htmlFor='size'>Size:</label>
                        <div className='select-custom'>
                          <select name='size' id='size' className='form-control'>
                            <option value='#'>Select a size</option>
                            <option value='s'>Small</option>
                            <option value='m'>Medium</option>
                            <option value='l'>Large</option>
                            <option value='xl'>Extra Large</option>
                          </select>
                        </div>
                        <a href='#' className='size-guide'>
                          <i className='icon-th-list' />
                          size guide
                        </a>
                      </div>
                      <div className='product-details-action'>
                        <div className='details-action-col'>
                          <label htmlFor='qty'>Qty:</label>
                          <div className='product-details-quantity'>
                            <QuantityInput value={quantity} setValue={setQuantity} />
                          </div>
                        </div>
                        <div className='details-action-wrapper'>
                          <Button type='button' fillType='outline' onClick={addToCart}>
                            <i className='icon-cart-plus me-3' />
                            <span className='text-uppercase'>add to cart</span>
                          </Button>
                          <Button type='button' fillType='link' themeType='dark'>
                            <i className='icon-heart-o me-3' />
                            <span>Add to Wishlist</span>
                          </Button>
                        </div>
                      </div>
                      <div className='product-details-footer details-footer-col'>
                        <div className='product-cat'>
                          <span>Category:</span>
                          <a href='#'>Women</a>,<a href='#'>Dresses</a>,<a href='#'>Yellow</a>
                        </div>
                        <div className='social-icons social-icons-sm'>
                          <span className='social-label'>Share:</span>
                          <a href='#' className='social-icon' title='Facebook' target='_blank'>
                            <i className='icon-facebook-f' />
                          </a>
                          <a href='#' className='social-icon' title='Twitter' target='_blank'>
                            <i className='icon-twitter' />
                          </a>
                          <a href='#' className='social-icon' title='Instagram' target='_blank'>
                            <i className='icon-instagram' />
                          </a>
                          <a href='#' className='social-icon' title='Pinterest' target='_blank'>
                            <i className='icon-pinterest' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-details-tab'>
                <ul className='nav nav-pills justify-content-center' role='tablist'>
                  <li className='nav-item'>
                    <Link href={`#${Tab.ProductDesc}`}>
                      <a
                        className={mergeClassNames('nav-link', activeTab === Tab.ProductDesc ? 'active' : '')}
                        role='tab'
                        aria-controls={Tab.ProductDesc}
                        aria-selected={activeTab === Tab.ProductDesc}
                      >
                        Description
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href={`#${Tab.ProductInfo}`}>
                      <a
                        className={mergeClassNames('nav-link', activeTab === Tab.ProductInfo ? 'active' : '')}
                        role='tab'
                        aria-controls={Tab.ProductInfo}
                        aria-selected={activeTab === Tab.ProductInfo}
                      >
                        Additional information
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href={`#${Tab.ProductShipping}`}>
                      <a
                        className={mergeClassNames('nav-link', activeTab === Tab.ProductShipping ? 'active' : '')}
                        role='tab'
                        aria-controls={Tab.ProductShipping}
                        aria-selected={activeTab === Tab.ProductShipping}
                      >
                        Shipping &amp; Returns
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href={`#${Tab.ProductReview}`}>
                      <a
                        className={mergeClassNames('nav-link', activeTab === Tab.ProductReview ? 'active' : '')}
                        role='tab'
                        aria-controls={Tab.ProductReview}
                        aria-selected={activeTab === Tab.ProductReview}
                      >
                        Reviews (2)
                      </a>
                    </Link>
                  </li>
                </ul>
                <div className='tab-content'>
                  <div
                    className={mergeClassNames('tab-pane fade', activeTab === Tab.ProductDesc ? 'show active' : '')}
                    role='tabpanel'
                    aria-labelledby='product-desc-link'
                  >
                    <div className='product-desc-content'>
                      <h3>Product Information</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis
                        eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
                        pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                        Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                        consectetuer ligula vulputate sem tristique cursus.{' '}
                      </p>
                      <ul>
                        <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. </li>
                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                      </ul>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis
                        eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
                        pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                        Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                        consectetuer ligula vulputate sem tristique cursus.{' '}
                      </p>
                    </div>
                  </div>
                  <div
                    className={mergeClassNames('tab-pane fade', activeTab === Tab.ProductInfo ? 'show active' : '')}
                    role='tabpanel'
                    aria-labelledby='product-info-link'
                  >
                    <div className='product-desc-content'>
                      <h3>Information</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis
                        eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
                        pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.{' '}
                      </p>
                      <h3>Fabric &amp; care</h3>
                      <ul>
                        <li>Faux suede fabric</li>
                        <li>Gold tone metal hoop handles.</li>
                        <li>RI branding</li>
                        <li>Snake print trim interior </li>
                        <li>Adjustable cross body strap</li>
                        <li> Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                      </ul>
                      <h3>Size</h3>
                      <p>one size</p>
                    </div>
                  </div>
                  <div
                    className={mergeClassNames('tab-pane fade', activeTab === Tab.ProductShipping ? 'show active' : '')}
                    role='tabpanel'
                    aria-labelledby='product-shipping-link'
                  >
                    <div className='product-desc-content'>
                      <h3>Delivery &amp; returns</h3>
                      <p>
                        We deliver to over 100 countries around the world. For full details of the delivery options we
                        offer, please view our <a href='#'>Delivery information</a>
                        <br />
                        We hope you’ll love every purchase, but if you ever need to return an item you can do so within
                        a month of receipt. For full details of how to make a return, please view our{' '}
                        <a href='#'>Returns information</a>
                      </p>
                    </div>
                  </div>
                  <div
                    className={mergeClassNames('tab-pane fade', activeTab === Tab.ProductReview ? 'show active' : '')}
                    role='tabpanel'
                    aria-labelledby='product-review-link'
                  >
                    <div className='reviews'>
                      <h3>Reviews (2)</h3>
                      <div className='review'>
                        <div className='row no-gutters'>
                          <div className='col-auto'>
                            <h4>
                              <a href='#'>Samanta J.</a>
                            </h4>
                            <div className='ratings-container'>
                              <div className='ratings'>
                                <div className='ratings-val' style={{ width: '80%' }} />
                              </div>
                            </div>
                            <span className='review-date'>6 days ago</span>
                          </div>
                          <div className='col'>
                            <h4>Good, perfect size</h4>
                            <div className='review-content'>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda
                                asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis
                                doloremque, possimus, explicabo, autem fugit beatae quae voluptas!
                              </p>
                            </div>
                            <div className='review-action'>
                              <a href='#'>
                                <i className='icon-thumbs-up' />
                                Helpful (2)
                              </a>
                              <a href='#'>
                                <i className='icon-thumbs-down' />
                                Unhelpful (0)
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='review'>
                        <div className='row no-gutters'>
                          <div className='col-auto'>
                            <h4>
                              <a href='#'>John Doe</a>
                            </h4>
                            <div className='ratings-container'>
                              <div className='ratings'>
                                <div className='ratings-val' style={{ width: '100%' }} />
                              </div>
                            </div>
                            <span className='review-date'>5 days ago</span>
                          </div>
                          <div className='col'>
                            <h4>Very good</h4>
                            <div className='review-content'>
                              <p>
                                Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium
                                iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus,
                                blanditiis perspiciatis beatae!
                              </p>
                            </div>
                            <div className='review-action'>
                              <a href='#'>
                                <i className='icon-thumbs-up' />
                                Helpful (0)
                              </a>
                              <a href='#'>
                                <i className='icon-thumbs-down' />
                                Unhelpful (0)
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className='title mb-4 text-center'>You May Also Like</h2>
              <div
                className='owl-carousel owl-simple carousel-equal-height carousel-with-shadow'
                data-bs-toggle='owl'
                data-owl-options='{
                              "nav": false, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":1
                                  },
                                  "480": {
                                      "items":2
                                  },
                                  "768": {
                                      "items":3
                                  },
                                  "992": {
                                      "items":4
                                  },
                                  "1200": {
                                      "items":4,
                                      "nav": true,
                                      "dots": false
                                  }
                              }
                          }'
              >
                <div className='product product-7 text-center'>
                  <figure className='product-media'>
                    <span className='product-label label-new'>New</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-4.jpg'
                        alt='Product image'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product-icon btn-quickview' title='Quick view'>
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
                      <a href='#'>Women</a>
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
                      <a href='#' style={{ background: '#7fc5ed' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#e8c97a' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='product product-7 text-center'>
                  <figure className='product-media'>
                    <span className='product-label label-out'>Out of Stock</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-6.jpg'
                        alt='Product image'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product-icon btn-quickview' title='Quick view'>
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
                <div className='product product-7 text-center'>
                  <figure className='product-media'>
                    <span className='product-label label-top'>Top</span>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-11.jpg'
                        alt='Product image'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product-icon btn-quickview' title='Quick view'>
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
                      <a href='#'>Shoes</a>
                    </div>
                    <h3 className='product-title'>
                      <a href='product.html'>Light brown studded Wide fit wedges</a>
                    </h3>
                    <div className='product-price'>$110.00</div>
                    <div className='ratings-container'>
                      <div className='ratings'>
                        <div className='ratings-val' style={{ width: '80%' }} />
                      </div>
                      <span className='ratings-text'>( 1 Reviews )</span>
                    </div>
                    <div className='product-nav product-nav-dots'>
                      <a href='#' className='active' style={{ background: '#8b513d' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#333333' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                      <a href='#' style={{ background: '#d2b99a' }}>
                        <span className='visually-hidden'>Color name</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='product product-7 text-center'>
                  <figure className='product-media'>
                    <a href='product.html'>
                      <Image
                        src='/assets/images/products/product-10.jpg'
                        alt='Product image'
                        className='product-image'
                      />
                    </a>
                    <div className='product-action-vertical'>
                      <a href='#' className='btn-product-icon btn-wishlist btn-expandable'>
                        <span>add to wishlist</span>
                      </a>
                      <a href='popup/quickView.html' className='btn-product-icon btn-quickview' title='Quick view'>
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
            </div>
            <aside className='col-lg-3'>
              <div className='sidebar sidebar-product'>
                <div className='widget widget-products'>
                  <h4 className='widget-title'>
                    <span>Related Product</span>
                    {/* <a
                      role='button'
                      data-bs-toggle='collapse'
                      href='#collapse-1'
                      aria-expanded='false'
                      aria-controls='collapse-1'
                    >
                      <i className='icon-angle-up' />
                    </a> */}
                  </h4>
                  <div id='collapse-1' className='collapse'>
                    <OwlCarousel items={1}>
                      <div className='products'>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/1.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Light brown studded Wide fit wedges</a>
                            </h5>
                            <div className='product-price'>
                              <span className='new-price'>$50.00</span>
                              <span className='old-price'>$110.00</span>
                            </div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/2.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Yellow button front tea top</a>
                            </h5>
                            <div className='product-price'>$56.00</div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/3.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Beige metal hoop tote bag</a>
                            </h5>
                            <div className='product-price'>$50.00</div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/4.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Black soft RI weekend travel bag</a>
                            </h5>
                            <div className='product-price'>$75.00</div>
                          </div>
                        </div>
                      </div>
                      <div className='products'>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/1.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Light brown studded Wide fit wedges</a>
                            </h5>
                            <div className='product-price'>
                              <span className='new-price'>$50.00</span>
                              <span className='old-price'>$110.00</span>
                            </div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/2.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Yellow button front tea top</a>
                            </h5>
                            <div className='product-price'>$56.00</div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/3.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Beige metal hoop tote bag</a>
                            </h5>
                            <div className='product-price'>$50.00</div>
                          </div>
                        </div>
                        <div className='product product-sm'>
                          <figure className='product-media'>
                            <a href='product.html'>
                              <Image
                                src='/assets/images/products/single/sidebar/4.jpg'
                                alt='Product image'
                                className='product-image'
                              />
                            </a>
                          </figure>
                          <div className='product-body'>
                            <h5 className='product-title'>
                              <a href='product.html'>Black soft RI weekend travel bag</a>
                            </h5>
                            <div className='product-price'>$75.00</div>
                          </div>
                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                  <a href='category.html' className='btn btn-outline-dark-3'>
                    <span>View More Products</span>
                    <i className='icon-long-arrow-right' />
                  </a>
                </div>
                <div className='widget widget-banner-sidebar'>
                  <div className='banner-sidebar-title'>ad box 280 x 280</div>
                  <div className='banner-sidebar banner-overlay'>
                    <a href='#'>
                      <Image src='/assets/images/blog/sidebar/banner.jpg' alt='banner' />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

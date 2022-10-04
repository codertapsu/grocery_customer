import { Breadcrumb } from '@components/breadcrumb';
import { Image } from '@components/image';
import { Layout } from '@components/layout';
import { PageHeader } from '@components/page-header';
import { NextPage } from 'next';

const Wishlist: NextPage = () => {
  return (
    <Layout>
      <PageHeader backgroundImage={'url("/assets/images/page-header-bg.jpg")'}>
        Wishlist<span>Shop</span>
      </PageHeader>
      <Breadcrumb />
      <div className='page-content'>
        <div className='container'>
          <table className='table-wishlist table-mobile table'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='product-col'>
                  <div className='product'>
                    <figure className='product-media'>
                      <a href='#' className='d-flex'>
                        <Image src='/assets/images/products/product-1.jpg' alt='Product image' responsive={false} />
                      </a>
                    </figure>
                    <h3 className='product-title'>
                      <a href='#'>Beige knitted elastic runner shoes</a>
                    </h3>
                  </div>
                </td>
                <td className='price-col'>$84.00</td>
                <td className='stock-col'>
                  <span className='in-stock'>In stock</span>
                </td>
                <td className='action-col'>
                  <div className='dropdown'>
                    <button
                      className='btn btn-block btn-outline-primary-2'
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className='icon-list-alt' />
                      Select Options
                    </button>
                    <div className='dropdown-menu'>
                      <a className='dropdown-item' href='#'>
                        First option
                      </a>
                      <a className='dropdown-item' href='#'>
                        Another option
                      </a>
                      <a className='dropdown-item' href='#'>
                        The best option
                      </a>
                    </div>
                  </div>
                </td>
                <td className='remove-col'>
                  <button className='btn-remove'>
                    <i className='icon-close' />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='product-col'>
                  <div className='product'>
                    <figure className='product-media'>
                      <a href='#' className='d-flex'>
                        <Image src='/assets/images/products/product-1.jpg' alt='Product image' responsive={false} />
                      </a>
                    </figure>
                    <h3 className='product-title'>
                      <a href='#'>Blue utility pinafore denim dress</a>
                    </h3>
                  </div>
                </td>
                <td className='price-col'>$76.00</td>
                <td className='stock-col'>
                  <span className='in-stock'>In stock</span>
                </td>
                <td className='action-col'>
                  <button className='btn btn-block btn-outline-primary-2'>
                    <i className='icon-cart-plus' />
                    Add to Cart
                  </button>
                </td>
                <td className='remove-col'>
                  <button className='btn-remove'>
                    <i className='icon-close' />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='product-col'>
                  <div className='product'>
                    <figure className='product-media'>
                      <a href='#' className='d-flex'>
                        <Image src='/assets/images/products/product-1.jpg' alt='Product image' responsive={false} />
                      </a>
                    </figure>
                    <h3 className='product-title'>
                      <a href='#'>Orange saddle lock front chain cross body bag</a>
                    </h3>
                  </div>
                </td>
                <td className='price-col'>$52.00</td>
                <td className='stock-col'>
                  <span className='out-of-stock'>Out of stock</span>
                </td>
                <td className='action-col'>
                  <button className='btn btn-block btn-outline-primary-2 disabled'>Out of Stock</button>
                </td>
                <td className='remove-col'>
                  <button className='btn-remove'>
                    <i className='icon-close' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='wishlist-share'>
            <div className='social-icons social-icons-sm mb-2'>
              <label className='social-label'>Share on:</label>
              <a href='#' className='social-icon' title='Facebook' target='_blank'>
                <i className='icon-facebook-f' />
              </a>
              <a href='#' className='social-icon' title='Twitter' target='_blank'>
                <i className='icon-twitter' />
              </a>
              <a href='#' className='social-icon' title='Instagram' target='_blank'>
                <i className='icon-instagram' />
              </a>
              <a href='#' className='social-icon' title='Youtube' target='_blank'>
                <i className='icon-youtube' />
              </a>
              <a href='#' className='social-icon' title='Pinterest' target='_blank'>
                <i className='icon-pinterest' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;

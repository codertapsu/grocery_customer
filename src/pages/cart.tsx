import { Breadcrumb } from '@components/breadcrumb';
import { Image } from '@components/image';
import { Layout } from '@components/layout';
import { useCart } from '@contexts/cart';
import { NextPage } from 'next';
import Link from 'next/link';

const Cart: NextPage = () => {
  const { items, totalPrice } = useCart();

  return (
    <Layout>
      <div className='page-header text-center' style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
        <div className='container'>
          <h1 className='page-title'>
            Shopping Cart<span>Shop</span>
          </h1>
        </div>
      </div>
      <Breadcrumb />
      <div className='page-content'>
        <div className='cart'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-9'>
                <table className='table-cart table-mobile table'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.product.id}>
                        <td className='product-col'>
                          <div className='product'>
                            <figure className='product-media'>
                              <Link href={`/products/${item.product.id}`}>
                                <a className='d-flex'>
                                  <Image src={item.product.images[0]} alt='Product image' responsive={false} />
                                </a>
                              </Link>
                            </figure>
                            <h3 className='product-title'>
                              <Link href={`/products/${item.product.id}`}>
                                <a>{item.product.title}</a>
                              </Link>
                            </h3>
                          </div>
                        </td>
                        <td className='price-col'>${item.product.price}</td>
                        <td className='quantity-col'>
                          <div className='cart-product-quantity'>
                            <input
                              type='number'
                              className='form-control'
                              defaultValue={1}
                              min={1}
                              max={10}
                              step={1}
                              data-decimals={0}
                              required
                            />
                          </div>
                        </td>
                        <td className='total-col'>${item.quantity * item.product.price}</td>
                        <td className='remove-col'>
                          <button className='btn-remove'>
                            <i className='icon-close' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='cart-bottom'>
                  <div className='cart-discount'>
                    <form action='#'>
                      <div className='input-group'>
                        <input type='text' className='form-control' required placeholder='coupon code' />
                        <div className='input-group-append'>
                          <button className='btn btn-outline-primary-2' type='submit'>
                            <i className='icon-long-arrow-right' />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <a href='#' className='btn btn-outline-dark-2'>
                    <span>UPDATE CART</span>
                    <i className='icon-refresh' />
                  </a>
                </div>
              </div>
              <aside className='col-lg-3'>
                <div className='summary summary-cart'>
                  <h3 className='summary-title'>Cart Total</h3>
                  <table className='table-summary table'>
                    <tbody>
                      <tr className='summary-subtotal'>
                        <td>Subtotal:</td>
                        <td>$160.00</td>
                      </tr>
                      <tr className='summary-shipping'>
                        <td>Shipping:</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr className='summary-shipping-row'>
                        <td>
                          <div className='custom-control custom-radio'>
                            <input type='radio' id='free-shipping' name='shipping' className='custom-control-input' />
                            <label className='custom-control-label' htmlFor='free-shipping'>
                              Free Shipping
                            </label>
                          </div>
                        </td>
                        <td>$0.00</td>
                      </tr>
                      <tr className='summary-shipping-row'>
                        <td>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              id='standart-shipping'
                              name='shipping'
                              className='custom-control-input'
                            />
                            <label className='custom-control-label' htmlFor='standart-shipping'>
                              Standart:
                            </label>
                          </div>
                        </td>
                        <td>$10.00</td>
                      </tr>
                      <tr className='summary-shipping-row'>
                        <td>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              id='express-shipping'
                              name='shipping'
                              className='custom-control-input'
                            />
                            <label className='custom-control-label' htmlFor='express-shipping'>
                              Express:
                            </label>
                          </div>
                        </td>
                        <td>$20.00</td>
                      </tr>
                      <tr className='summary-shipping-estimate'>
                        <td>
                          Estimate for Your Country
                          <br /> <a href='dashboard.html'>Change address</a>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr className='summary-total'>
                        <td>Total:</td>
                        <td>$160.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link href='/checkout'>
                    <a className='btn btn-outline-primary-2 btn-order btn-block'>PROCEED TO CHECKOUT</a>
                  </Link>
                </div>
                <Link href={{ pathname: '/categories', query: {} }}>
                  <a href='category.html' className='btn btn-outline-dark-2 btn-block mb-3'>
                    <span>CONTINUE SHOPPING</span>
                    <i className='icon-refresh' />
                  </a>
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

import { NextPage } from 'next';
import Link from 'next/link';

import { Breadcrumb } from '@components/breadcrumb';
import { ButtonLink } from '@components/button';
import { Image } from '@components/image';
import { Layout } from '@components/layout2';
import { useCart } from '@contexts/cart';
import { PageHeader } from '@components/page-header';

const Cart: NextPage = () => {
  const { items, totalPrice } = useCart();

  return (
    <Layout>
      <PageHeader backgroundImage={'url("/assets/images/page-header-bg.jpg")'}>
        Shopping Cart<span>Shop</span>
      </PageHeader>
      <Breadcrumb items={[{ href: '', name: 'Cart' }]} />
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
                                  Holder
                                  {/* <Image src={item.product.medias[0].path} alt='Product image' responsive={false} /> */}
                                </a>
                              </Link>
                            </figure>
                            <h3 className='product-title'>
                              <Link href={`/products/${item.product.id}`}>
                                <a>{item.product.name}</a>
                              </Link>
                            </h3>
                          </div>
                        </td>
                        <td className='price-col'>${item.product.promotionalPrice}</td>
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
                        <td className='total-col'>${item.quantity * item.product.promotionalPrice}</td>
                        <td className='remove-col'>
                          <button className='btn-remove'>
                            <i className='icon-close' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='cart-bottom justify-content-between'>
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
                  <ButtonLink href='/checkout' fillType='outline' themeType='dark'>
                    <span>CONTINUE SHOPPING</span>
                    <i className='icon-cart-arrow-down ms-3' />
                  </ButtonLink>
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
                          <br />
                          <Link href='/dashboard'>
                            <a>Change address</a>
                          </Link>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr className='summary-total'>
                        <td>Total:</td>
                        <td>$160.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <ButtonLink href='/checkout' fillType='outline' className='w-100'>
                    <span>PROCEED TO CHECKOUT</span>
                  </ButtonLink>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

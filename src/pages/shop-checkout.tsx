import { useSelector } from 'react-redux';

import { Layout } from '@components/layout/layout';
import { Item, Select } from '@components/select';
import { StoreState, useReduxStore } from '@contexts/redux-store';

const Cart = () => {
  const cartItems = useSelector<StoreState, StoreState['cart']>((state) => state.cart);
  const { closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, openCart, clearCart } = useReduxStore();
  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));

    return price;
  };

  const items: Item<string>[] = [
    { id: '1', text: 'Alerts' },
    { id: '2', text: 'Badges' },
    { id: '3', text: 'Buttons' },
    { id: '4', text: 'Cards' },
    { id: '5', text: 'Forms' },
    { id: '6', text: 'Modals' },
  ];

  return (
    <>
      <Layout parent='Home' sub='Shop' subChild='Checkout'>
        <section className='mt-50 mb-50'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mb-40'>
                <h1 className='heading-2 mb-10'>Checkout</h1>
                <div className='d-flex justify-content-between'>
                  <h6 className='text-body'>
                    There are <span className='text-brand'>3</span> products in your cart
                  </h6>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-7'>
                <div className='row mb-50'>
                  <div className='col-lg-6 mb-sm-15 mb-lg-0 mb-md-3'>
                    <div className='toggle_info'>
                      <span>
                        <i className='fi-rs-user mr-10' />
                        <span className='text-muted font-lg'>Already have an account?</span>{' '}
                        <a
                          href='#loginform'
                          data-bs-toggle='collapse'
                          className='collapsed font-lg'
                          aria-expanded='false'
                        >
                          Click here to login
                        </a>
                      </span>
                    </div>
                    <div className='panel-collapse collapse login_form' id='loginform'>
                      <div className='panel-body'>
                        <p className='mb-30 font-sm'>
                          If you have shopped with us before, please enter your details below. If you are a new
                          customer, please proceed to the Billing &amp; Shipping section.
                        </p>
                        <form method='post'>
                          <div className='form-group'>
                            <input type='text' name='email' placeholder='Username Or Email' />
                          </div>
                          <div className='form-group'>
                            <input type='password' name='password' placeholder='Password' />
                          </div>
                          <div className='login_footer form-group'>
                            <div className='chek-form'>
                              <div className='custome-checkbox'>
                                <input className='form-check-input' type='checkbox' name='checkbox' id='remember' />
                                <label className='form-check-label' htmlFor='remember'>
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a href='#'>Forgot password?</a>
                          </div>
                          <div className='form-group'>
                            <button className='btn btn-md' name='login'>
                              Log in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <form method='post' className='apply-coupon'>
                      <input type='text' placeholder='Enter Coupon Code...' />
                      <button className='btn  btn-md' name='login'>
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </div>
                <div className='row'>
                  <h4 className='mb-30'>Billing Details</h4>
                  <form method='post'>
                    <div className='row'>
                      <div className='form-group col-lg-6'>
                        <input type='text' required name='fname' placeholder='First name *' />
                      </div>
                      <div className='form-group col-lg-6'>
                        <input type='text' required name='lname' placeholder='Last name *' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='form-group col-lg-6'>
                        <input type='text' name='billing_address' required placeholder='Address *' />
                      </div>
                      <div className='form-group col-lg-6'>
                        <input type='text' name='billing_address2' required placeholder='Address line2' />
                      </div>
                    </div>
                    <div className='row shipping_calculator'>
                      <div className='form-group col-lg-6'>
                        <div className='custom_select'>
                          <Select
                            items={items}
                            value={'2'}
                            onChange={(e) => {
                              console.log(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className='form-group col-lg-6'>
                        <input required type='text' name='city' placeholder='City / Town *' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='form-group col-lg-6'>
                        <input required type='text' name='zipcode' placeholder='Postcode / ZIP *' />
                      </div>
                      <div className='form-group col-lg-6'>
                        <input required type='text' name='phone' placeholder='Phone *' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='form-group col-lg-6'>
                        <input required type='text' name='cname' placeholder='Company Name' />
                      </div>
                      <div className='form-group col-lg-6'>
                        <input required type='text' name='email' placeholder='Email address *' />
                      </div>
                    </div>
                    <div className='form-group mb-30'>
                      <textarea rows={5} placeholder='Additional information' defaultValue={''} />
                    </div>
                    <div className='form-group'>
                      <div className='checkbox'>
                        <div className='custome-checkbox'>
                          <input className='form-check-input' type='checkbox' name='checkbox' id='createaccount' />
                          <label
                            className='form-check-label label_info'
                            data-bs-toggle='collapse'
                            data-target='#collapsePassword'
                            aria-controls='collapsePassword'
                            htmlFor='createaccount'
                          >
                            <span>Create an account?</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div id='collapsePassword' className='form-group create-account collapse in'>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <input required type='password' placeholder='Password' name='password' />
                        </div>
                      </div>
                    </div>
                    <div className='ship_detail'>
                      <div className='form-group'>
                        <div className='chek-form'>
                          <div className='custome-checkbox'>
                            <input className='form-check-input' type='checkbox' name='checkbox' id='differentaddress' />
                            <label
                              className='form-check-label label_info'
                              data-bs-toggle='collapse'
                              data-target='#collapseAddress'
                              aria-controls='collapseAddress'
                              htmlFor='differentaddress'
                            >
                              <span>Ship to a different address?</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div id='collapseAddress' className='different_address collapse in'>
                        <div className='row'>
                          <div className='form-group col-lg-6'>
                            <input type='text' required name='fname' placeholder='First name *' />
                          </div>
                          <div className='form-group col-lg-6'>
                            <input type='text' required name='lname' placeholder='Last name *' />
                          </div>
                        </div>
                        <div className='row shipping_calculator'>
                          <div className='form-group col-lg-6'>
                            <input required type='text' name='cname' placeholder='Company Name' />
                          </div>
                          <div className='form-group col-lg-6'>
                            <div className='custom_select w-100'>
                              <Select
                                items={items}
                                value={'2'}
                                onChange={(e) => {
                                  console.log(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='form-group col-lg-6'>
                            <input type='text' name='billing_address' required placeholder='Address *' />
                          </div>
                          <div className='form-group col-lg-6'>
                            <input type='text' name='billing_address2' required placeholder='Address line2' />
                          </div>
                        </div>
                        <div className='row'>
                          <div className='form-group col-lg-6'>
                            <input required type='text' name='state' placeholder='State / County *' />
                          </div>
                          <div className='form-group col-lg-6'>
                            <input required type='text' name='city' placeholder='City / Town *' />
                          </div>
                        </div>
                        <div className='row'>
                          <div className='form-group col-lg-6'>
                            <input required type='text' name='zipcode' placeholder='Postcode / ZIP *' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-lg-5'>
                <div className='cart-totals ml-30 mb-50 border p-40'>
                  <div className='d-flex align-items-end justify-content-between mb-30'>
                    <h4>Your Order</h4>
                    <h6 className='text-muted'>Subtotal</h6>
                  </div>
                  <div className='divider-2 mb-30'></div>
                  <div className='table-responsive order_table'>
                    {cartItems.length <= 0 && 'No Products'}
                    <table className={cartItems.length > 0 ? 'no-border table' : 'd-none'}>
                      <tbody>
                        {cartItems.map((item, i) => (
                          <tr key={i}>
                            <td className='image product-thumbnail'>
                              <img src={item.images[0].img} alt='#' />
                            </td>
                            <td>
                              <h6 className='w-160 mb-5'>
                                <a>{item.title}</a>
                                <div className='product-rate-cover'>
                                  <div className='product-rate d-inline-block'>
                                    <div
                                      className='product-rating'
                                      style={{
                                        width: '90%',
                                      }}
                                    ></div>
                                  </div>
                                  <span className='font-small text-muted ml-5'> (4.0)</span>
                                </div>
                              </h6>{' '}
                            </td>
                            <td>
                              <h6 className='text-muted pl-20 pr-20'>x {item.quantity}</h6>
                            </td>
                            <td>
                              <h4 className='text-brand'>
                                $$
                                {item.quantity * item.price}
                              </h4>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='bt-1 border-color-1 mt-30 mb-30'></div>
                  <div className='payment_method'>
                    <div className='mb-25'>
                      <h5>Payment</h5>
                    </div>
                    <div className='payment_option'>
                      <div className='custome-radio'>
                        <input
                          className='form-check-input'
                          required
                          type='radio'
                          name='payment_option'
                          id='exampleRadios3'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='exampleRadios3'
                          data-bs-toggle='collapse'
                          data-target='#bankTranfer'
                          aria-controls='bankTranfer'
                        >
                          Direct Bank Transfer
                        </label>
                        <div className='form-group collapse in' id='bankTranfer'>
                          <p className='text-muted mt-5'>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration.{' '}
                          </p>
                        </div>
                      </div>
                      <div className='custome-radio'>
                        <input
                          className='form-check-input'
                          required
                          type='radio'
                          name='payment_option'
                          id='exampleRadios4'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='exampleRadios4'
                          data-bs-toggle='collapse'
                          data-target='#checkPayment'
                          aria-controls='checkPayment'
                        >
                          Check Payment
                        </label>
                        <div className='form-group collapse in' id='checkPayment'>
                          <p className='text-muted mt-5'>
                            Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store
                            Postcode.{' '}
                          </p>
                        </div>
                      </div>
                      <div className='custome-radio'>
                        <input
                          className='form-check-input'
                          required
                          type='radio'
                          name='payment_option'
                          id='exampleRadios5'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='exampleRadios5'
                          data-bs-toggle='collapse'
                          data-target='#paypal'
                          aria-controls='paypal'
                        >
                          Paypal
                        </label>
                        <div className='form-group collapse in' id='paypal'>
                          <p className='text-muted mt-5'>
                            Pay via PayPal; you can pay with your credit card if you don&lsquo;t have a PayPal account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href='#' className='btn btn-fill-out btn-block mt-30'>
                    Place Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;

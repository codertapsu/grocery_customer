import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';

import NextImage from 'next/image';
import Link from 'next/link';

import { StoreState, useReduxStore } from '@contexts/redux-store';

export const CartSidebar = () => {
  const cartItems = useSelector<StoreState, any[]>((state) => state.cart);
  const { closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, openCart, clearCart } = useReduxStore();

  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));

    return price;
  };

  return (
    <>
      <div className={`cart-sidebar cart cart_active`} style={{ width: '250px' }}>
        <div className='cart-sidebar-header'>
          <div className='cart-sidebar-item-count'>
            <span>
              <i className='fas fa-shopping-bag'></i>
            </span>
            {cartItems.length > 0 ? `${cartItems.length} items` : 'No Products'}
          </div>
          <span className='close-cart-sidebar' onClick={closeCart}>
            <i className='fas fa-times'></i>
          </span>
        </div>
        <PerfectScrollbar>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i}>
                <div className='d-flex'>
                  <div className='flex-grow-1'>
                    <NextImage
                      src={item.image}
                      width='0'
                      height='0'
                      sizes='100vw'
                      style={{
                        width: '75px',
                        height: '75px',
                      }}
                      className='align-self-center mr-2'
                      alt=''
                    />
                    <div>
                      <h6 className='mb-0'>{item.name}</h6>
                      <p className='mb-0'>
                        <span>${item.price} </span> x<span>{item.quantity}</span>
                      </p>
                      <div className='quantity-switch'>
                        <span onClick={(e) => decreaseQuantity(item.id)}>
                          <button>-</button>
                        </span>
                        {/* {item.quantity} */}
                        <span onClick={(e) => increaseQuantity(item.id)}>
                          <button>+</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='single-total'>
                    {item.quantity * item.price}
                    <span className='ml-2' onClick={(e) => deleteFromCart(item.id)}>
                      <button>Delete</button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </PerfectScrollbar>

        {cartItems.length > 0 && (
          <button className='clear-cart' onClick={clearCart}>
            Clear all
          </button>
        )}
        <Link href='/cart' legacyBehavior>
          <div className='cart-popup-total'>
            <span>Continue</span>
            <div className='amount'>Total : {price()}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

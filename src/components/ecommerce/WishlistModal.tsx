import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { StoreState, useReduxStore } from '@contexts/redux-store';

export const WishlistModal = () => {
  const modalRef = useRef<HTMLDivElement>();
  const wishlist = useSelector<StoreState, StoreState['wishlist']>((state) => state.wishlist);
  const { closeWishlistModal, deleteFromWishlist, clearWishlist, addToCart } = useReduxStore();
  const handleCart = (product) => {
    addToCart(product);
    toast('Product added to Cart !');
  };

  const hideModal = () => {
    if (window.bootstrap) {
      const modalEle = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      bsModal.hide();
      closeWishlistModal();
    }
  };

  useEffect(() => {
    if (wishlist.modal) {
      const modalEle = modalRef.current;
      const bsModal = new window.bootstrap.Modal(modalEle, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
      bsModal.show();
    }
  }, [wishlist.modal]);

  return (
    <>
      {wishlist.modal && (
        <div ref={modalRef} tabIndex={-1} role='dialog' aria-hidden='true' className='modal fade'>
          <div role='document' className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='btn-close' aria-label='Close' onClick={() => hideModal()} />
              </div>
              <div className='modal-body'>
                {wishlist.items.length > 0 ? (
                  <div className='table-responsive'>
                    <table className='table'>
                      <tbody>
                        <tr>
                          {/* <td></td> */}
                          <td>
                            <strong>Product Name</strong>
                          </td>
                          <td>
                            <strong>Price</strong>
                          </td>
                          <td>
                            <strong>Quantity</strong>
                          </td>
                          <td>
                            <strong>Action</strong>
                          </td>
                        </tr>

                        {wishlist.items.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <img src={product.image} alt='' className='img-fluid' width='70' />
                            </td>

                            <td>${product.price}</td>
                            <td style={{ width: '200px' }}>
                              <span onClick={(e) => handleCart(product)}>Add To Cart</span>
                            </td>
                            <td style={{ width: '50px' }} className='text-center'>
                              <span onClick={(e) => deleteFromWishlist(product.id)}>
                                <button>Delete</button>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='text-right'>
                      <span className='clear-btn' onClick={clearWishlist}>
                        Clear All
                      </span>
                    </div>
                  </div>
                ) : (
                  <h4 className='mb-0'>No Products</h4>
                )}
              </div>
              <div className='modal-footer'></div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-header {
          border-bottom-width: 0px;
        }
        .modal-footer {
          border-top-width: 0px;
        }
      `}</style>
    </>
  );
};

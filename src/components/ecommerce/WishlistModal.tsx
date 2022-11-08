import { useEffect, useRef } from 'react';

import { WishlistTable } from '@components/wishlist-table';
import { useWishlist } from '@contexts/wishlist';

export const WishlistModal = () => {
  const { products, close, isOpen } = useWishlist();
  const modalRef = useRef<HTMLDivElement>();

  const hideModal = () => {
    if (window.bootstrap) {
      const modalEle = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      bsModal.hide();
      close();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const modalEle = modalRef.current;
      const bsModal = new window.bootstrap.Modal(modalEle, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
      bsModal.show();
      modalEle.addEventListener(
        'hidden.bs.modal',
        () => {
          close();
        },
        { once: true },
      );
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <div ref={modalRef} tabIndex={-1} role='dialog' aria-hidden='true' className='modal fade'>
        <div role='document' className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='btn-close' aria-label='Close' onClick={() => hideModal()} />
            </div>
            <div className='modal-body'>
              {products.length > 0 ? <WishlistTable /> : <h4 className='mb-0'>No Products</h4>}
            </div>
            <div className='modal-footer'></div>
          </div>
        </div>
      </div>
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

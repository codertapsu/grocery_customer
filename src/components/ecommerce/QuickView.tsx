import { useEffect, useRef } from 'react';

import { useQuickView } from '@contexts/quick-view';

import { ProductDetails } from './ProductDetails';

export const QuickView = () => {
  const { product, close } = useQuickView();
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
    if (product) {
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
  }, [product]);

  if (!product) {
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
              <ProductDetails product={product} isQuickView={true} />
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

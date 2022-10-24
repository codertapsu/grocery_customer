import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { StoreState, useReduxStore } from '@contexts/redux-store';

import { ProductDetails } from './ProductDetails';

const images = [
  { src: '/images/offer/offer-1.jpg' },
  { src: '/images/offer/offer-2.jpg' },
  { src: '/images/offer/offer-3.jpg' },
];

export const QuickView = () => {
  const modalRef = useRef<HTMLDivElement>();

  const quickView = useSelector<StoreState, StoreState['quickView']>((state) => state.quickView);
  const { closeQuickView } = useReduxStore();
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i].src} width='75' />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const hideModal = () => {
    if (window.bootstrap) {
      const modalEle = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      bsModal.hide();
      closeQuickView();
    }
  };

  useEffect(() => {
    if (quickView) {
      const modalEle = modalRef.current;
      const bsModal = new window.bootstrap.Modal(modalEle, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
      bsModal.show();
    }
  }, [quickView]);

  return (
    <>
      {quickView && (
        <div ref={modalRef} tabIndex={-1} role='dialog' aria-hidden='true' className='modal fade'>
          <div role='document' className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='btn-close' aria-label='Close' onClick={() => hideModal()} />
              </div>
              <div className='modal-body'>
                <ProductDetails product={quickView} quickView={quickView} />
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

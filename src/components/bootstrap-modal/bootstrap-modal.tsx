import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal?: (value: boolean) => void;
  afterClose?: (...args: unknown[]) => void;
}

export const BootstrapModal = (props: Props) => {
  const modalRef = useRef<HTMLDivElement>();

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new window.bootstrap.Modal(modalEle, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    if (window.bootstrap) {
      const modalEle = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      bsModal.hide();
      props.setShowModal(false);
    }
  };

  useEffect(() => {
    if (props.showModal) {
      showModal();
    } else {
      hideModal();
    }
  }, [props.showModal]);

  return (
    <div className='modal fade' ref={modalRef} tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-body'>
            <button type='button' className='close border-0 bg-transparent' aria-label='Close' onClick={hideModal}>
              <span aria-hidden='true'>
                <i className='icon-close' />
              </span>
            </button>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

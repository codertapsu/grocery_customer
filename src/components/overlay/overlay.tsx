import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DialogContainer } from './dialog-container';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal?: (value: boolean) => void;
  afterClose?: (...args: unknown[]) => void;
}

const overlayBackdropId = `overlay-backdrop`;

const Overlay = ({ children, showModal, setShowModal, afterClose }: Props) => {
  const overlayContainerRef = useRef<HTMLElement>();

  useEffect(() => {
    const isClientSide = typeof window !== 'undefined';
    if (isClientSide) {
      let overlayContainer: HTMLElement = document.body.querySelector(`:scope > #${overlayBackdropId}`);

      if (!overlayContainer) {
        overlayContainer = document.createElement('div');
        overlayContainer.setAttribute('role', 'dialog');
        overlayContainer.setAttribute('id', overlayBackdropId);
        document.body.appendChild(overlayContainer);
      }

      overlayContainerRef.current = overlayContainer;
    }
    return () => {
      if (typeof afterClose !== 'undefined') {
        afterClose();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log(e.key);

      if (e.key === 'Escape') {
        setShowModal(false);
        // write your logic here.
      }
    };
    if (showModal) {
      window.addEventListener('keyup', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      overlayContainerRef.current.classList.add('show');
    } else {
      overlayContainerRef.current.classList.remove('show');
    }
  }, [showModal]);

  return showModal
    ? createPortal(
        <DialogContainer close={() => setShowModal(false)}>{children}</DialogContainer>,
        overlayContainerRef.current,
      )
    : null;
};

export { Overlay };

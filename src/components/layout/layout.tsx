import { useCallback, useEffect, useRef, useState } from 'react';

import { AuthForm } from '@components/auth/auth-form';
import { NewsLetter } from '@components/news-letter';
import { Overlay } from '@components/overlay';
import { useAuth } from '@contexts/auth';
import { isClientSide } from '@helpers/detect-browser';
import { mergeClassNames } from '@helpers/merge-class-names.helper';

import { Footer } from '../footer';
import { Header } from '../header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showNewsLetterModal, setShowNewsLetterModal] = useState(false);
  const { isOpenAuthDialog, closeAuthDialog } = useAuth();
  const ref = useRef<HTMLButtonElement>();

  const observeScrollButton = useCallback(() => {
    if (window.scrollY > 400) {
      if (!ref.current.classList.contains('show')) {
        ref.current.classList.add('show');
      }
    } else {
      ref.current.classList.remove('show');
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const isClientSide = typeof window !== 'undefined';
    if (isClientSide) {
      window.addEventListener('scroll', observeScrollButton);
    }

    return () => {
      if (isClientSide) {
        window.removeEventListener('scroll', observeScrollButton);
      }
    };
  }, []);

  useEffect(() => {
    const clientSide = isClientSide();
    let timerId: number;
    if (clientSide) {
      // timerId = window.setTimeout(() => {
      //   setShowNewsLetterModal(true);
      // }, 5000);
    }

    return () => {
      if (clientSide && timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <>
      <div className={mergeClassNames('page-wrapper')}>
        <Header />
        <main className='main'>{children}</main>
        <Footer />
      </div>
      <button ref={ref} id='scroll-top' title='Back to Top' onClick={scrollToTop}>
        <i className='icon-arrow-up' />
      </button>
      <Overlay
        showModal={isOpenAuthDialog}
        setShowModal={(value) => {
          if (!value) {
            closeAuthDialog();
          }
        }}
      >
        <AuthForm
          onLoginSuccess={() => {
            closeAuthDialog();
          }}
          onLoginFailed={() => {
            closeAuthDialog();
          }}
          onRegisterSuccess={() => {
            closeAuthDialog();
          }}
        />
      </Overlay>
      <Overlay
        showModal={showNewsLetterModal}
        setShowModal={setShowNewsLetterModal}
        afterClose={() => {
          //
        }}
      >
        <NewsLetter />
      </Overlay>
    </>
  );
};

export { Layout };

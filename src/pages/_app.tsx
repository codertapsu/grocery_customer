// import "react-input-range/lib/css/index.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import 'react-responsive-modal/styles.css';
// import '../../public/assets/css/main.css';
// Swiper Slider
import 'swiper/css';
import 'swiper/css/navigation';
import '../../public/assets/sass/main.scss';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { SessionProvider } from 'next-auth/react';

import { StorageWrapper } from '@components/ecommerce/storage-wrapper';
import { Preloader } from '@components/elements/Preloader';
import { AuthContextProvider } from '@contexts/auth';
import { CartContextProvider } from '@contexts/cart';
import { HttpClientProvider } from '@contexts/http-client';
import { ReduxStoreContextProvider, store } from '@contexts/redux-store';
import { SettingsContextProvider } from '@contexts/settings';
import { ToastProvider } from '@contexts/toast';
import { WalletProvider } from '@contexts/wallet';

import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Script from 'next/script';

export const gtmVirtualPageView = (rest) => {
  (window as any).dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  });
};

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric): void {
  // (window as any).gtag('event', name, {
  //   event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
  //   value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
  //   event_label: id, // id unique to current page load
  //   non_interaction: true, // avoids affecting bounce rate.
  // });
}

function MyApp({ Component, router, pageProps: { session, ...pageProps } }: AppProps) {
  const url = `https://taphoa.toampk.xyz${router.route}`;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (!window.bootstrap) {
      import('bootstrap/dist/js/bootstrap')
        .then((bootstrap) => {
          window.bootstrap = bootstrap;
          //
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps]);

  return (
    <>
      <ToastProvider>
        <HttpClientProvider>
          <SessionProvider session={session} refetchInterval={0}>
            <AuthContextProvider>
              <SettingsContextProvider>
                {/* <SocketProvider> */}
                <WalletProvider>
                  <CartContextProvider>
                    {/* <Component {...pageProps} /> */}
                    {!loading ? (
                      <Provider store={store}>
                        <StorageWrapper>
                          <ReduxStoreContextProvider>
                            <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                              <Component {...pageProps} canonical={url} key={url} />
                            </AnimatePresence>
                          </ReduxStoreContextProvider>
                        </StorageWrapper>
                      </Provider>
                    ) : (
                      <Preloader />
                    )}
                  </CartContextProvider>
                </WalletProvider>
                {/* </SocketProvider> */}
              </SettingsContextProvider>
            </AuthContextProvider>
          </SessionProvider>
        </HttpClientProvider>
      </ToastProvider>
    </>
  );
}

export default MyApp;

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import 'nouislider/distribute/nouislider.css';ks
// import '../styles/globals.css';
import '../styles/theme/styles.scss';
import '../styles/globals.scss';

import { SessionProvider } from 'next-auth/react';

import { NotificationProvider } from '@contexts/notification.context';
import { SocketProvider } from '@contexts/socket.context';
import { WalletProvider } from '@contexts/wallet.context';

import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { HttpClientProvider } from '@contexts/http-client';
import { AuthContextProvider } from '@contexts/auth';
import { useEffect } from 'react';
import { CartContextProvider } from '@contexts/cart';
import { SettingsContextProvider } from '@contexts/settings';

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

/**
 * Use of the <SessionProvider> is mandatory to allow components that call
 * @see useSession() anywhere in your application to access the `session` object.
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
      .then(() => {
        //
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <NotificationProvider>
      <HttpClientProvider>
        <SessionProvider session={session} refetchInterval={0}>
          <AuthContextProvider>
            <SettingsContextProvider>
              {/* <SocketProvider> */}
              <WalletProvider>
                <CartContextProvider>
                  <Component {...pageProps} />
                </CartContextProvider>
              </WalletProvider>
              {/* </SocketProvider> */}
            </SettingsContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </HttpClientProvider>
    </NotificationProvider>
  );
}

export default MyApp;

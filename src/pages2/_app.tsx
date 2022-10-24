import '../styles/globals.scss';

import { useEffect } from 'react';

import { SessionProvider } from 'next-auth/react';

import { AuthContextProvider } from '@contexts/auth';
import { CartContextProvider } from '@contexts/cart';
import { HttpClientProvider } from '@contexts/http-client';
import { SettingsContextProvider } from '@contexts/settings';
import { ToastProvider } from '@contexts/toast';
import { WalletProvider } from '@contexts/wallet';

import type { AppProps } from 'next/app';
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
      .then((bootstrap) => {
        window.bootstrap = bootstrap;
        //
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

export default MyApp;

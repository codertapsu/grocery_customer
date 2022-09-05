import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { CartProvider } from '@contexts/cart.context';
import { NotificationProvider } from '@contexts/notification.context';
import { SocketProvider } from '@contexts/socket.context';
import { WalletProvider } from '@contexts/wallet.context';

import type { AppProps } from 'next/app';
import { Router } from 'next/router';

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

/**
 * Use of the <SessionProvider> is mandatory to allow components that call
 * @see useSession() anywhere in your application to access the `session` object.
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        {/* <SocketProvider> */}
          <WalletProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </WalletProvider>
        {/* </SocketProvider> */}
      </SessionProvider>
    </NotificationProvider>
  );
}

export default MyApp;

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { CartProvider } from '@contexts/cart.context';
import { NotificationProvider } from '@contexts/notification.context';
import { SocketProvider } from '@contexts/socket.context';

import type { AppProps } from 'next/app';
import { WalletProvider } from '@contexts/wallet.context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <SocketProvider>
        <WalletProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </WalletProvider>
      </SocketProvider>
    </NotificationProvider>
  );
}

export default MyApp;

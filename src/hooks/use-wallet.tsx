import { WalletContext } from '@contexts/wallet.context';
import { useContext } from 'react';

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    /**
     * {@link @contexts/wallet.context#WalletContext}
     */
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

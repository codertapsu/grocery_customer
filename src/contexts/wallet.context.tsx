import { createContext, useCallback, useEffect, useReducer, useState } from 'react';

import { ethers } from 'ethers';
import Web3Modal, { IProviderOptions } from 'web3modal';

import groceryCoin from '@abi/GroceryCoinBep20.json';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import {
  BLOCK_EXPLORER_URL,
  BSC_MAINNET,
  BSC_TESTNET,
  CHAIN_ID,
  CHAIN_ID_HEX,
  DECIMALS,
  GROCERY_COIN,
  GROCERY_TESTNET,
  NETWORK_NAME,
  RPC_URL,
  SYMBOL,
} from '@configs';
import { useNotification } from '@hooks/use-notification';
import { WalletAction } from '@models/wallet-action.model';
import { WalletState } from '@models/wallet-state.model';
import { walletInitialState, walletReducer } from '@reducers/wallet.reducer';
import WalletConnectProvider from '@walletconnect/web3-provider';

import type { IWalletConnectProviderOptions } from '@walletconnect/types';
import { useLocalStorage } from 'usehooks-ts';

interface CatchError {
  code: number;
  message: string;
}

const connectProviderOptions: Partial<IWalletConnectProviderOptions> = {
  rpc: {
    [BSC_MAINNET.CHAIN_ID]: RPC_URL,
    [BSC_TESTNET.CHAIN_ID]: RPC_URL,
    [GROCERY_TESTNET.CHAIN_ID]: RPC_URL,
  },
  chainId: CHAIN_ID,
  qrcode: true,
};

const providerOptions: IProviderOptions = {
  binanceChainWallet: {
    package: true,
  },
  coinbaseWallet: {
    options: connectProviderOptions,
    package: CoinbaseWalletSDK,
  },
  walletConnect: {
    package: WalletConnectProvider,
    options: connectProviderOptions,
    connector: async (providerPackage?: any, opts?: unknown) => {
      const provider = new providerPackage(opts);
      await provider.enable();
      return provider;
    },
  },
};

export const WalletContext = createContext<WalletState>(null);

/**
 * @publicApi
 */
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, walletInitialState);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(null);
  const notificationService = useNotification();
  const [autoConnectWallet, setAutoConnectWallet] = useLocalStorage<boolean>('autoConnectWallet', false);

  const clearStoreAndProvider = useCallback(() => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    dispatch({ type: 'RESET_WEB3_PROVIDER' });
  }, [web3Modal]);

  const connectWithWalletConnect = useCallback(async () => {
    try {
      const providerWalletConnect = new WalletConnectProvider(connectProviderOptions);
      await providerWalletConnect.enable();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providerWalletConnect.on('accountsChanged', async (accounts: unknown, chainId: number) => {
        await providerWalletConnect.disconnect();
        clearStoreAndProvider();
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providerWalletConnect.on('disconnect', (code: unknown, reason: unknown) => {
        clearStoreAndProvider();
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      providerWalletConnect.on('session_update', (error: unknown, payload: unknown) => {
        if (error) {
          throw error;
        }
      });

      const web3Provider = new ethers.providers.Web3Provider(providerWalletConnect);

      if (providerWalletConnect.chainId.toString() === CHAIN_ID.toString()) {
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        const chainId = network.chainId;
        const groceryCoinContract = new ethers.Contract(GROCERY_COIN.ADDRESS, groceryCoin.abi, signer);
        dispatch({
          type: 'SET_WEB3_PROVIDER',
          address,
          chainId,
          network,
          provider: providerWalletConnect,
          signer,
          web3Provider,
          groceryCoinContract,
        } as WalletAction);
      } else {
        await providerWalletConnect.disconnect();
        clearStoreAndProvider();
        notificationService.error(`Please change network to ${NETWORK_NAME}`);
      }
    } catch (error) {
      const errorConnection = error as { code: number; message: string };
      notificationService.error(errorConnection.message);
    }
  }, []);

  const detectCurrentBrowserProvider = useCallback(() => {
    let browserProvider: ethers.providers.ExternalProvider;
    if (window.ethereum) {
      browserProvider = window.ethereum;
    } else if (window.web3) {
      browserProvider = window.web3.currentProvider;
    } else {
      notificationService.warn('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    return browserProvider;
  }, [notificationService]);

  const connectWithWeb3Modal = useCallback(async () => {
    try {
      let provider = await web3Modal.connect();
      let web3Provider = new ethers.providers.Web3Provider(provider);
      let network = await web3Provider.getNetwork();
      let chainId = network.chainId;

      if (String(chainId) === String(CHAIN_ID)) {
        const signer = web3Provider.getSigner();
        const groceryCoinContract = new ethers.Contract(GROCERY_COIN.ADDRESS, groceryCoin.abi, signer);
        const address = await signer.getAddress();
        dispatch({
          type: 'SET_WEB3_PROVIDER',
          address,
          chainId,
          network,
          provider,
          signer,
          web3Provider,
          groceryCoinContract,
        } as WalletAction);
        notificationService.success('Connected to Web3');
      } else {
        notificationService.warn('Please change network to ' + NETWORK_NAME);

        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID_HEX }],
          });
          provider = await web3Modal.connect();
          web3Provider = new ethers.providers.Web3Provider(provider);
          network = await web3Provider.getNetwork();
          chainId = network.chainId;
          const signer = web3Provider.getSigner();
          const address = await signer.getAddress();
          const groceryCoinContract = new ethers.Contract(GROCERY_COIN.ADDRESS, groceryCoin.abi, signer);
          dispatch({
            type: 'SET_WEB3_PROVIDER',
            provider,
            web3Provider,
            address,
            signer,
            chainId,
            network,
            groceryCoinContract,
          } as WalletAction);
          notificationService.success('Connected to Web3');
        } catch (error) {
          const switchError = error as { code: number; message: string };
          if (switchError.code === 4902) {
            notificationService.warn('Please confirm add network to ' + NETWORK_NAME);
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: CHAIN_ID_HEX,
                    chainName: NETWORK_NAME,
                    nativeCurrency: {
                      name: NETWORK_NAME,
                      symbol: SYMBOL,
                      decimals: DECIMALS,
                    },
                    blockExplorerUrls: [BLOCK_EXPLORER_URL],
                    rpcUrls: [RPC_URL],
                  },
                ],
              });
            } catch (error) {
              const addError = error as { code: number; message: string };
              notificationService.error(addError.message);
            }
          } else {
            notificationService.error(switchError.message);
          }
        }
      }
    } catch (error) {
      const errorConnection = error as CatchError;
      if (errorConnection.code === 4001) {
        notificationService.error(`Can't connect wallet`);
      } else if (errorConnection.message) {
        notificationService.error(errorConnection.message);
      } else {
        notificationService.error(String(errorConnection));
      }
    }
  }, [web3Modal, notificationService]);

  const disconnectWallet = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    if (state.provider?.disconnect && typeof state.provider.disconnect === 'function') {
      await state.provider.disconnect();
    }
    notificationService.error('Disconnected from Web3');
    dispatch({ type: 'RESET_WEB3_PROVIDER' });
  }, [web3Modal, state.provider, notificationService]);

  /**
   * @method connectWallet
   */
  const connectWallet = useCallback(async () => {
    const browserProvider = detectCurrentBrowserProvider();
    if (browserProvider) {
      await connectWithWeb3Modal();
    } else {
      await connectWithWalletConnect();
    }
  }, [connectWithWeb3Modal, connectWithWalletConnect, detectCurrentBrowserProvider]);

  // EIP-1193 events
  useEffect(() => {
    if (state.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        notificationService.info('Changed Web3 Account');
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as WalletAction);
      };

      /**
       * @see https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
       * @param hexChainId
       * @type {String}
       */
      const handleChainChanged = () => {
        if (typeof window !== 'undefined') {
          notificationService.info('Web3 Network Changed');
          window.location.reload();
        }
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      state.provider.on('accountsChanged', handleAccountsChanged);
      state.provider.on('chainChanged', handleChainChanged);
      state.provider.on('disconnect', handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (state.provider.removeListener) {
          state.provider.removeListener('accountsChanged', handleAccountsChanged);
          state.provider.removeListener('chainChanged', handleChainChanged);
          state.provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [state.provider, disconnectWallet, notificationService]);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(web3Modal);
  }, []);

  // Auto connect to the cached provider
  useEffect(() => {
    if (autoConnectWallet) {
      connectWallet().then(() => {
        setAutoConnectWallet(true);
        // Noop
      });
    }
  }, []);

  const value = {
    address: state.address,
    chainId: state.chainId,
    network: state.network,
    provider: state.provider,
    signer: state.signer,
    web3Provider: state.web3Provider,
    groceryCoinContract: state.groceryCoinContract,
    connect: connectWallet,
    disconnect: disconnectWallet,
  } as WalletState;
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

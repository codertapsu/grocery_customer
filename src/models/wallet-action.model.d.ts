import { WalletState } from './wallet-state.model';

export type WalletAction =
  | {
      type: 'SET_WEB3_PROVIDER';
      provider?: WalletState['provider'];
      web3Provider?: WalletState['web3Provider'];
      address?: WalletState['address'];
      chainId?: WalletState['chainId'];
      signer?: WalletState['signer'];
      network?: WalletState['network'];
      groceryCoinContract: WalletState['groceryCoinContract'];
    }
  | {
      type: 'SET_ADDRESS';
      address?: WalletState['address'];
    }
  | {
      type: 'SET_NETWORK';
      network?: WalletState['network'];
    }
  | {
      type: 'RESET_WEB3_PROVIDER';
    };

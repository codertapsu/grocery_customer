import { WalletAction } from '@models/wallet-action.model';
import { WalletState } from '@models/wallet-state.model';

export const walletInitialState: WalletState = {
  address: null,
  chainId: null,
  connect: null,
  disconnect: null,
  network: null,
  provider: null,
  signer: null,
  web3Provider: null,
  groceryCoinContract: null,
};

export const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        address: action.address,
        chainId: action.chainId,
        network: action.network,
        provider: action.provider,
        signer: action.signer,
        web3Provider: action.web3Provider,
        groceryCoinContract: action.groceryCoinContract,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      };
    case 'SET_NETWORK':
      return {
        ...state,
        network: action.network,
      };
    case 'RESET_WEB3_PROVIDER':
      return walletInitialState;
    default:
      throw new Error();
  }
};

import type { ethers } from 'ethers';
import type { GroceryCoinBep20 } from '@models/ethers-contracts';

export interface WalletState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: string;
  chainId: number;
  network: ethers.providers.Network;
  provider: any;
  signer: ethers.providers.JsonRpcSigner;
  web3Provider: ethers.providers.Web3Provider;
  groceryCoinContract: GroceryCoinBep20;
  connect: (() => Promise<void>) | null;
  disconnect: (() => Promise<void>) | null;
}

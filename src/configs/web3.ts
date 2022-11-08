import { isProduction } from './environment';

/**
 * https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain
 */
export const BSC_MAINNET = {
  NETWORK_NAME: 'Smart Chain',
  RPC_URL: 'https://bsc-dataseed.binance.org',
  CHAIN_ID: 56,
  CHAIN_ID_HEX: '0x38',
  SYMBOL: 'BNB',
  BLOCK_EXPLORER_URL: 'https://bscscan.com',
};

export const BSC_TESTNET = {
  NETWORK_NAME: 'Smart Chain - Testnet',
  RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  CHAIN_ID: 97,
  CHAIN_ID_HEX: '0x61',
  SYMBOL: 'BNB',
  BLOCK_EXPLORER_URL: 'https://testnet.bscscan.com',
};

export const GROCERY_TESTNET = {
  NETWORK_NAME: 'Grocery Chain',
  RPC_URL: 'https://coin.codertapsu.dev',
  CHAIN_ID: 1337,
  CHAIN_ID_HEX: '0x539',
  SYMBOL: 'ETH',
  BLOCK_EXPLORER_URL: '',
};

export const GROCERY_COIN = {
  ADDRESS: '0x9247607cAFC4aD858ADF2C3914Cc9Cc8C9C60608',
};

export const CHAIN_ID_HEX = isProduction ? BSC_MAINNET.CHAIN_ID_HEX : BSC_TESTNET.CHAIN_ID_HEX;
export const RPC_URL = isProduction ? BSC_MAINNET.RPC_URL : BSC_TESTNET.RPC_URL;
export const CHAIN_ID = isProduction ? BSC_MAINNET.CHAIN_ID : BSC_TESTNET.CHAIN_ID;
export const NETWORK_NAME = isProduction ? BSC_MAINNET.NETWORK_NAME : BSC_TESTNET.NETWORK_NAME;
export const BLOCK_EXPLORER_URL = isProduction ? BSC_MAINNET.BLOCK_EXPLORER_URL : BSC_TESTNET.BLOCK_EXPLORER_URL;
export const SYMBOL = isProduction ? BSC_MAINNET.SYMBOL : BSC_TESTNET.SYMBOL;
export const DECIMALS = 18;

/**
 * Shop owner wallet address
 */
export const SHOP_OWNER_WALLET_ADDRESS = '0xd6e707a6a75593C274a9441D4248161697578A76';

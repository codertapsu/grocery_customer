import { CHAIN_ID, NETWORK_NAME, SHOP_OWNER_WALLET_ADDRESS } from '@configs';
import { useNotification } from '@hooks/use-notification';
import { useWallet } from '@hooks/use-wallet';
import { ethers } from 'ethers';
import { Button } from './button';

interface ButtonBuyProps {
  productPrice: number;
}

export const EthBuyButton = ({ productPrice }: ButtonBuyProps) => {
  const { signer, network, connect: connectWallet } = useWallet();

  const notificationService = useNotification();

  const handleConnectBuy = () => {
    if (signer) {
      sendTransaction();
    } else {
      connectWallet();
    }
  };

  const sendTransaction = async () => {
    if (network.chainId !== CHAIN_ID) {
      notificationService.error(`Only ${NETWORK_NAME} is available for buy`);

      return;
    }

    const tx = {
      to: SHOP_OWNER_WALLET_ADDRESS,
      value: ethers.utils.parseEther(String(productPrice)),
    };

    try {
      const transaction = await signer.sendTransaction(tx);
      const res = await transaction.wait();
      console.log(res);
    } catch (err) {
      notificationService.error(JSON.stringify(err));
    }
  };

  return (
    <Button onClick={() => handleConnectBuy()}>
      {!signer ? 'Connect wallet to buy' : <>Buy {productPrice} ETH (~0,20USD)</>}
    </Button>
  );
};

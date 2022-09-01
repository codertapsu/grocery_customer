import { CHAIN_ID, NETWORK_NAME, SHOP_OWNER_WALLET_ADDRESS } from '@configs';
import { useNotification } from '@hooks/use-notification';
import { useWallet } from '@hooks/use-wallet';
import { ethers } from 'ethers';
import { Button } from './button';

interface ButtonBuyProps {
  productPrice: string;
}

export const CoinBuyButton = ({ productPrice }: ButtonBuyProps) => {
  const { signer, network, groceryCoinContract, connect: connectWallet } = useWallet();

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

    try {
      const transaction = await groceryCoinContract.transfer(
        SHOP_OWNER_WALLET_ADDRESS,
        ethers.utils.parseEther(productPrice),
      );
      const contractReceipt = await transaction.wait();
      console.log(contractReceipt);
    } catch (err) {
      console.log(err);
      
      // notificationService.error(JSON.stringify(err));
    }
  };

  return (
    <Button onClick={() => handleConnectBuy()}>
      {!signer ? 'Connect wallet to buy' : <>Buy {productPrice} token (~0,20USD)</>}
    </Button>
  );
};

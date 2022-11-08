import { useContext } from 'react';

import { CreditCardsContext } from './credit-cards.context';

export const useCreditCards = () => {
  const context = useContext(CreditCardsContext);

  if (!context) {
    throw new Error('useCreditCard must be used within a CreditCardsContext.Provider');
  }

  return context;
};

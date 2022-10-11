import { useHttpClient } from '@contexts/http-client';
import React, { createContext } from 'react';

interface Context {
  loadConfig: () => unknown;
}

export const CreditCardsContext = createContext<Context>(null);

export const CreateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const httpClient = useHttpClient();
  const loadConfig = () => {
    return httpClient.get('/credit-cards/config');
  };

  const value: Context = {
    loadConfig,
  };

  return <CreditCardsContext.Provider value={value}>{children}</CreditCardsContext.Provider>;
};

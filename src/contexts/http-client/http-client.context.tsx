import { createContext, useMemo } from 'react';
import { HttpClient } from './http-client';
import { useContext } from 'react';

export const HttpClientContext = createContext<HttpClient>(null);

export const HttpClientProvider = ({ children }: { children: React.ReactNode }) => {
  // isProduction ? process.env.API_URL : `http://localhost:5000`;
  const httpClient = useMemo(() => new HttpClient(process.env.API_URL), []);

  return <HttpClientContext.Provider value={httpClient}>{children}</HttpClientContext.Provider>;
};

export const useHttpClient = () => {
  const context = useContext(HttpClientContext);

  if (!context) {
    throw new Error('useHttpClient must be used within a HttpClientContext.Provider');
  }

  return context;
};

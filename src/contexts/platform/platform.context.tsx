import { createContext } from 'react';
import { PlatformService } from './platform.service';

export const PlatformContext = createContext<PlatformService>(null);

export const PlatformContextProvider = ({ children }: { children: React.ReactNode }) => {
  const value = new PlatformService();

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

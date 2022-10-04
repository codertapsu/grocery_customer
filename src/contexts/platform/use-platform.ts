import { useContext } from 'react';

import { PlatformContext } from './platform.context';

export const usePlatform = () => {
  const context = useContext(PlatformContext);

  if (!context) {
    throw new Error('usePlatform must be used within a PlatformContext.Provider');
  }

  return context;
};

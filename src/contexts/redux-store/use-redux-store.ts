import { useContext } from 'react';

import { ReduxStoreContext } from './store.context';

export const useReduxStore = () => {
  const context = useContext(ReduxStoreContext);
  if (!context) {
    throw new Error('useReduxStore must be used within a ReduxStoreContext.Provider');
  }
  return context;
};

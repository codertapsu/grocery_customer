import { useMemo, useContext } from 'react';
import { QuickViewContext } from './quick-view.context';

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewContext.Provider');
  }
  return useMemo(() => context, [context]);
};

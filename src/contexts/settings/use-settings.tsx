import { useMemo, useContext } from 'react';
import { SettingsContext } from './settings.context';

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsContext.Provider');
  }
  return useMemo(() => context, [context]);
};

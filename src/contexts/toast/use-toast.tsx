import { useContext } from 'react';
import { ToastContext } from './toast.context';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastContext.Provider');
  }

  return context;
};

import { NotificationContext } from '@contexts/notification.context';
import { useContext } from 'react';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
};

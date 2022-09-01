import { SocketContext } from '@contexts/socket.context';
import { useContext } from 'react';

export const useSocket = () => useContext(SocketContext);

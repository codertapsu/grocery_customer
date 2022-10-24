import { createContext, useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

import { EVENTS, SOCKET_URL } from '@configs';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: VoidFunction;
  messages?: { message: string; time: string; username: string }[];
  setMessages: VoidFunction;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

export const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

export const SocketProvider = (props: any) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = 'Chat app';
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = 'New message...';
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
};

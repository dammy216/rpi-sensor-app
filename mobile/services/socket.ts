// services/socket.ts
import { CONSTS } from '@/constants/const';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(`http://${CONSTS.LOCAL_SERVER_IP}:3000`);

    // 接続成功
    socket.on('connect', () => {
      console.log('[socket] connected:', socket?.id);
    });

    // 切断
    socket.on('disconnect', (reason) => {
      console.log('[socket] disconnected:', reason);
    });

    // 接続エラー
    socket.on('connect_error', (err) => {
      console.error('[socket] connect_error:', err.message);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

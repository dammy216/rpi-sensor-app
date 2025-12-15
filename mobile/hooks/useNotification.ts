import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { disconnectSocket, getSocket } from '../services/socket';
import { registerInfraredNotification } from '../services/notificationHandlers';
import { Socket } from 'socket.io-client';

//通知設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotification = () => {
  useEffect(() => {
    const socket: Socket = getSocket();

    const unregister = registerInfraredNotification(socket);

    return () => {
      unregister();
      disconnectSocket();
    };
  }, []);
};

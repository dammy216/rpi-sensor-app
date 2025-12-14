import { InfraredData } from '@shared/types/infraredTypes';
import * as Notifications from 'expo-notifications';
import { Socket } from 'socket.io-client';

export const registerInfraredNotification = (socket: Socket) => {

  const infraredHandler = async (data: InfraredData) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "人を検知しました！",
        body: `時刻: ${data.detectedAt}`,
        sound: true,
      },
      trigger: null,
    });
  };

  socket.on("notification", infraredHandler);

  return () => {
    socket.off("notification", infraredHandler);
  };
};

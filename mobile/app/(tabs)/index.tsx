import HistoryView from '@/screens/HistoryView';
import { useEffect } from 'react';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function Index() {

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };
    requestPermission();
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <HistoryView />
    </View>
  );
}
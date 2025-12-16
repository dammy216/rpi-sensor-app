import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getDetectionHistory } from "../services/apiRequests";
import DetectionHistoryTable from "../components/DetectionHistoryList";
import { InfraredDetectionHistoryData } from "@shared/types/infraredTypes";
import { useInfraredRealtime } from "@/hooks/useInfraredRealtime";

export default function HistoryView() {
  const [histories, setHistories] = useState<InfraredDetectionHistoryData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDetectionHistory();

        setHistories(data);
      } catch (err) {
        console.error("履歴取得失敗", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useInfraredRealtime((newHistory) => {
    setHistories(prev => [newHistory, ...(prev ?? [])]);
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <DetectionHistoryTable histories={histories} />
    </View>
  );
}

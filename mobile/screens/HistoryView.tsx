import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getDetectionHistory } from "../services/apiRequests";
import DetectionHistoryTable from "../components/ui/DetectionHistoryList";
import { InfraredDetectionHistory } from "@shared/types/infraredTypes";

export default function HistoryView() {
  const [histories, setHistories] = useState<InfraredDetectionHistory[] | null>([]);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <DetectionHistoryTable histories={histories} />
    </View>
  );
}

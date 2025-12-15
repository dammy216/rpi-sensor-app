import { formatJstDateTime } from "@/utils/formatDateUtils";
import { InfraredDetectionHistoryData } from "@shared/types/infraredTypes";
import { FlatList, View, Text } from "react-native";

type Props = {
  histories: InfraredDetectionHistoryData[] | null;
};

export default function DetectionHistoryList(props: Props) {
  
  return (
    <FlatList
      data={props.histories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text>{formatJstDateTime(item.detectedAt)}に人を検知しました</Text>
        </View>
      )}
    />
  );
}

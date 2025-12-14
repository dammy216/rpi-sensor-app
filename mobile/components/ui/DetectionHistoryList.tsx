import { InfraredDetectionHistory } from "@shared/types/infraredTypes";
import { FlatList, View, Text } from "react-native";

type Props = {
  histories: InfraredDetectionHistory[] | null;
};

export default function DetectionHistoryList(props: Props) {
  return (
    <FlatList
      data={props.histories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text>{item.detectedAt}</Text>
        </View>
      )}
    />
  );
}

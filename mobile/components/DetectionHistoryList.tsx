import { formatJstDateTime } from "@/utils/formatDateUtils";
import { InfraredDetectionHistoryData } from "@shared/types/infraredTypes";
import { FlatList, View, Text, StyleSheet } from "react-native";
import * as emoji from "node-emoji";


type Props = {
  histories: InfraredDetectionHistoryData[] | null;
};

export default function DetectionHistoryList(props: Props) {

  const renderData = (histories: InfraredDetectionHistoryData) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.textView}>
          <Text numberOfLines={3} ellipsizeMode='tail' style={styles.dataText}>{formatJstDateTime(histories.detectedTime)}に人を検知しました{emoji.random().emoji}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>検知履歴</Text>
      <FlatList data={props.histories} keyExtractor={(item) => item.id} renderItem={({ item }) => renderData(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
    marginBottom: 16,
  },
  dataContainer: {
    marginVertical: 8,
    marginHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  textView: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flex: 1,
  },
  dataText: {
    fontSize: 16,
  },
});

import { InfraredDetectionHistory } from "@/types/DetectionHistoryType";
import axios from "axios";

export const getDetectionHistory = async (): Promise<InfraredDetectionHistory[] | null> => {
  try {
    const response = await axios.get("http://192.168.32.164:3000/infrared/");
    return response ? response.data : null;
  } catch (error) {
    console.log("テキストデータの取得に失敗しました", error);
    return null;
  }
};
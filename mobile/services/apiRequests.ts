import CONSTS from "@shared/constants/const";
import { InfraredDetectionHistoryData } from "@shared/types/infraredTypes";
import axios from "axios";

export const getDetectionHistory = async (): Promise<InfraredDetectionHistoryData[] | null> => {
  try {
    const response = await axios.get(`http://${CONSTS.LOCAL_SERVER_IP}:3000/infrared/`);
    return response ? response.data : null;
  } catch (error) {
    console.log("テキストデータの取得に失敗しました", error);
    return null;
  }
};
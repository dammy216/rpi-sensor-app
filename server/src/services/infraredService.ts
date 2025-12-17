import type { InfraredData, InfraredDetectionHistoryData } from "@shared/types/infraredTypes.js";
import { Server } from "socket.io";
import DetectionHistoryModel, { type DetectionHistoryDoc } from "../models/DetectionHistory.js";

// フロントに渡せる形式に変換
const toInfraredDetectionHistoryData = (doc: DetectionHistoryDoc): InfraredDetectionHistoryData => ({
  id: doc._id.toString(),
  detectedTime: doc.detectedTime.toISOString(),
});

// 履歴取得
export const getInfraredDetectionHistory = async (): Promise<InfraredDetectionHistoryData[]> => {
  const histories = await DetectionHistoryModel.find().sort({ detectedAt: -1 }).limit(50).exec();

  return histories.map(toInfraredDetectionHistoryData);
};

// 履歴保存
export const saveInfraredDetectionHistory = async (data: InfraredData) => {
  const savedData = await DetectionHistoryModel.create({ detectedTime: new Date(data.detectedAt) });
  return savedData;
};

// 検知情報送信
export const sendInfraredDetectionInfo = (savedData: DetectionHistoryDoc, io: Server) => {
  const payload = toInfraredDetectionHistoryData(savedData);

  io.emit("infraredDetection", payload);
  io.emit("notification", { detectedTime: payload.detectedTime, });
};



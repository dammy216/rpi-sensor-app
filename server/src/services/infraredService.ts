import type { InfraredData, InfraredDetectionHistoryData } from "@shared/types/infraredTypes.js";
import { Server } from "socket.io";
import DetectionHistoryModel, { type DetectionHistoryDoc } from "../models/DetectionHistory.js";

// 履歴取得
export const getInfraredDetectionHistory = async () => {
  const histories = await DetectionHistoryModel.find().sort({ detectedAt: -1 }).limit(50).exec();
  return histories;
};

// 履歴保存
export const saveInfraredDetectionHistory = async (data: InfraredData) => {
  const savedData = await DetectionHistoryModel.create({ detectedAt: new Date(data.detectedAt) });
  return savedData;
};

// 検知情報送信
export const sendInfraredDetectionInfo = (savedData: DetectionHistoryDoc, io: Server) => {
  const payload: InfraredDetectionHistoryData = {
    id: savedData._id.toString(),
    detectedAt: savedData.detectedAt.toISOString(),
  };

  // UI更新用
  io.emit("infraredDetection", payload);

  // 通知専用
  io.emit("notification", {
    detectedAt: payload.detectedAt,
  });
};


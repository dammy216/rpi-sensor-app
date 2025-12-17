// ラズパイからサーバーへ送信される赤外線センサーデータの型
export interface InfraredData {
  value?: number;
  detectedAt: string;
};

// サーバーからモバイルへ送信される赤外線検知履歴の型
export interface InfraredDetectionHistoryData {
  id: string;
  detectedTime: string;
}
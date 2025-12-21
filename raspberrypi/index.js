// index.js
import axios from "axios";
import { readGPIO } from "./gpio/infraredSensor.js";
import { recordVideo } from "./camera/recorder.js";

let prevValue = 0;
let isRecording = false;

setInterval(async () => {
  const value = readGPIO();

  if (prevValue === 0 && value === 1 && !isRecording) {
    isRecording = true;

    console.log("👀 人を検知しました。サーバーへ送信します。");

    try {
      await axios.post(
        "http://192.168.32.164:3000/infrared/post",
        {
          value,
          detectedAt: new Date().toISOString(),
        },
        {
          timeout: 5000,
        }
      );

      console.log("✅ 送信成功。録画を開始します。");

      const ffmpeg = recordVideo();

      ffmpeg.on("close", () => {
        console.log("🛑 録画終了");
        isRecording = false;
      });

    } catch (err) {
      console.error("❌ 送信失敗:", err.message);
      isRecording = false;
    }
  }

  prevValue = value;
}, 100);

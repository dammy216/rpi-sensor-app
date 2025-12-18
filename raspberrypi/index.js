// index.js
import axios from "axios";
import { readGPIO } from "./gpio/infraredSensor.js";
import { recordVideo } from "./camera/recorder.js";

let prevValue = 0;
let isRecording = false;

setInterval(() => {
  const value = readGPIO();

  if (prevValue === 0 && value === 1 && !isRecording) {
    isRecording = true;

    console.log("🎥 人を検知しました。録画を開始します。");

    const ffmpeg = recordVideo();

    ffmpeg.on("close", async () => {
      console.log("🛑 録画終了");

      try {
        await axios.post("http://192.168.32.164:3000/infrared/post", {
          value,
          detectedAt: new Date().toISOString(),
        },
          {
            timeout: 5000,
          });
      } catch (err) {
        console.error("送信失敗:", err.message);
      }

      isRecording = false;
    });
  }

  prevValue = value;
}, 100);

import axios from "axios";
import { Chip, Line } from "node-libgpiod";

const readGPIO = () => {
  const chip = new Chip(0);
  const line = new Line(chip, 26);

  line.requestInputMode();

  const value = line.getValue();
  line.release();
  return value;
};

let prevValue = 0;

setInterval(async () => {
  const value = readGPIO();

  // 立ち上がり検出処理
  if (prevValue === 0 && value === 1) {
    console.log("Detected rising edge");

    await axios.post("http://192.168.32.164:3000/infrared", {
      value,
      detectedAt: new Date().toISOString()
    });
  }

  prevValue = value;

}, 100);

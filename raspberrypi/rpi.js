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

setInterval(async () => {
  const value = readGPIO();

  if (value === 1) {
    await axios.post("http://192.168.32.164:3000/infrared/sensor", {
      value: value,
      detectedAt: new Date().toISOString()
    });
  }
}, 300);

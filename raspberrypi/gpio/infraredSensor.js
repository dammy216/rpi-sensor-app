// gpio/infraredSensor.js
import { Chip, Line } from "node-libgpiod";

export const readGPIO = () => {
  const chip = new Chip(0);
  const line = new Line(chip, 26);

  line.requestInputMode();
  const value = line.getValue();
  line.release();

  return value;
};


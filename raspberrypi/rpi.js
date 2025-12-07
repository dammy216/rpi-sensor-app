const { Chip, Line } = require("node-libgpiod");

const readGPIO = () => {
  const chip = new Chip(0);
  const line = new Line(chip, 26);
  line.requestInputMode();

  const value = line.getValue();
  line.release(); // ハンドルを解放
  
  return value;
}

setInterval(() => {
  console.log(readGPIO());
}, 100); // 0.1秒ごと

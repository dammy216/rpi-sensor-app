// camera/recorder.js
import { spawn } from "child_process";
import fs from "fs";

export const recordVideo = () => {
  const dir = "./videos";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  const ffmpeg = spawn("ffmpeg", [
    "-y",
    "-f", "v4l2",
    "-input_format", "mjpeg",
    "-framerate", "15",
    "-video_size", "640x480",
    "-i", "/dev/video0",
    "-t", "5",
    "-vcodec", "libx264",
    `${dir}/video_${timestamp}.mp4`
  ]);

  return ffmpeg;
};

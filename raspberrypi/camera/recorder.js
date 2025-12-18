// camera/recorder.js
import { spawn } from "child_process";

export const recordVideo = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  return spawn("ffmpeg", [
    "-y",
    "-f", "v4l2",
    "-input_format", "mjpeg",
    "-framerate", "15",
    "-video_size", "640x480",
    "-i", "/dev/video0",
    "-t", "5",
    "-vcodec", "libx264",
    `./videos/video_${timestamp}.mp4`
  ]);
};

import { useEffect } from "react";
import { getSocket } from "@/services/socket";
import { InfraredDetectionHistoryData } from "@shared/types/infraredTypes";
import { Socket } from "socket.io-client";

export const useInfraredRealtime = (
  onReceive: (data: InfraredDetectionHistoryData) => void
) => {
  useEffect(() => {
    const socket: Socket = getSocket();

    socket.on("infraredDetection", onReceive);

    return () => {
      socket.off("infraredDetection", onReceive);
    };
  }, [onReceive]);
};

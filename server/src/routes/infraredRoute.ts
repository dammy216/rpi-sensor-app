import { Hono } from "hono";
import { Server } from "socket.io";
import type { InfraredData } from "@shared/types/infraredTypes.js";
import { getInfraredDetectionHistory, saveInfraredDetectionHistory, sendInfraredDetectionInfo } from "../services/infraredService.js";
import { log } from "node:console";

export const infraredRoute = (io: Server) => {
  const app = new Hono();

  app.get("/", async (c) => {
    try {
      const histories = await getInfraredDetectionHistory();

      return c.json(histories);
    } catch (err) {
      return c.json({ message: "履歴の取得に失敗しました" }, 500);
    }
  });

  app.post("/post", async (c) => {
    try {
      const data = await c.req.json<InfraredData>();

      if (data.value !== 1) {
        return c.json({ ok: true });
      }

      log("赤外線検知データ受信:", data);

      const savedData = await saveInfraredDetectionHistory(data);
      sendInfraredDetectionInfo(savedData, io);

      return c.json({ ok: true });
    } catch (err) {
      return c.json({ message: "検知処理に失敗しました" }, 500);
    }
  });

  return app;
};

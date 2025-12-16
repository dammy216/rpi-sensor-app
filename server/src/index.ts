import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "node:http";
import { infraredRoute } from "./routes/infraredRoute.js";
import { cors } from "hono/cors";
import { connectDB } from "./database/connect.js";

await connectDB();

const app = new Hono();
app.use('*', cors({ origin: '*' }));

const httpServer = serve({
  fetch: app.fetch,
  port: 3000,
});

const io = new Server(httpServer as HTTPServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("WebSocket connected:", socket.id);
});

app.route('/infrared', infraredRoute(io));


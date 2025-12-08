import { Hono } from 'hono';

type SensorData = {
  value: number;
  detectedAt: string;
};

const app = new Hono();

// ② ラズパイがセンサー情報を送る（認証なし）
app.post('/sensor', async (c) => {
  const { value, detectedAt } = await c.req.json<SensorData>();

  console.log("Sensor:", value, detectedAt);

});

export default app;
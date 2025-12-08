import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import infrared from './routes/infrared.js';

const app = new Hono();

app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.route('/infrared', infrared);  

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

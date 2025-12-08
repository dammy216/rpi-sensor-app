import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import posts from './routes/posts.js';
import infrared from './routes/infrared.js';

const app = new Hono();

app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.route('/posts', posts);
app.route('/infrared', infrared);  

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

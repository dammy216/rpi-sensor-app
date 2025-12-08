import { Hono } from 'hono'

const app = new Hono();

type BlogPost = {
  title: string;
  content: string;
};

let blogPosts = [
  { id: 1, title: 'First Post', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Post', content: 'This is the second blog post.' }
];

app.get('/', (c) => {
  return c.json(blogPosts);
});

app.get('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const post = blogPosts.find(p => p.id === id);

  if (post) {
    return c.json(post);
  } else {
    return c.json({ error: 'Post not found' }, 404);
  }
});

app.post('/', async (c) => {
  const { title, content } = await c.req.json<BlogPost>();
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content
  };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

export default app;
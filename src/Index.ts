import { Hono } from 'hono'; const app = new Hono(); app.get('/', (c) => c.text('Ganga Seva Sangat Alert System Online!')); app.get('/api/status', (c) => c.json({ status: 'active', system: 'Ganga Seva Sangat', timestamp: new Date().toISOString() })); export default app;



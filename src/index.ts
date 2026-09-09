import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
  ADMIN_PASSWORD?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Live Web Interface (Dashboard UI)
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GSS Core Circle Alert System</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; margin: 0; padding: 20px; text-align: center; color: #1e293b; }
        .card { background: #ffffff; padding: 30px; border-radius: 16px; max-width: 420px; margin: 40px auto; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        h2 { color: #d97706; margin-top: 0; margin-bottom: 8px; font-size: 24px; }
        p { margin: 8px 0; color: #64748b; font-size: 15px; }
        .badge { display: inline-block; background: #dcfce7; color: #15803d; font-size: 14px; font-weight: 600; padding: 6px 14px; border-radius: 9999px; margin: 15px 0; }
        .btn { display: block; width: 100%; padding: 12px; margin-top: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; color: white; background: #2563eb; text-decoration: none; box-sizing: border-box; font-size: 15px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>🚩 Ganga Seva Sangat</h2>
        <p><b>Core Circle Emergency Alert System</b></p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <div><span class="badge">🟢 Live Web Portal Active</span></div>
        <p>Aapka emergency notification server aur D1 database successfully online hai.</p>
        <a href="/api/status" class="btn">System Status JSON Check Karein</a>
      </div>
    </body>
    </html>
  `)
})

// Status API
app.get('/api/status', (c) => {
  return c.json({ 
    status: 'active', 
    system: 'GSS Core Circle Alert System', 
    domain: 'alert.gangasevasangat.com',
    timestamp: new Date().toISOString() 
  })
})

export default app

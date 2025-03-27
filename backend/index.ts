import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { staticPlugin } from '@elysiajs/static';
import { join } from 'path';

// Create a new Elysia app
const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Bun API Server',
        version: '1.0.0',
        description: 'API server for Bun-React template',
      },
      tags: [
        { name: 'General', description: 'General endpoints' },
      ],
    },
  }))
  // Set CORS headers for all routes
  .onRequest(({ set }) => {
    set.headers['Access-Control-Allow-Origin'] = '*';
    set.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    set.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  })
  // Root endpoint
  .get('/', () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bun AIO Template</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 { color: #2c3e50; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .card {
          background: #f9f9f9;
          border-left: 4px solid #3498db;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        code {
          background: #eee;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <h1>Bun All-in-One Template API Server</h1>
      <p>Welcome to the Bun AIO Template API server! The server is up and running correctly.</p>
      
      <div class="card">
        <h2>Available Endpoints:</h2>
        <ul>
          <li><a href="/api">/api</a> - API root endpoint</li>
          <li><a href="/api/health">/api/health</a> - Health check endpoint</li>
          <li><a href="/swagger">/swagger</a> - API documentation</li>
        </ul>
      </div>
      
      <div class="card">
        <h2>Development:</h2>
        <p>For frontend development, make sure to run:</p>
        <code>bun run dev:all</code>
        <p>This will start both the API server and the frontend development server.</p>
      </div>

      <p>For more information, see the <a href="https://github.com/your-username/bun-AIO-template">project README</a>.</p>
    </body>
    </html>`;
  })
  // API endpoints
  .get('/api', () => {
    return 'API is working correctly!';
  }, {
    detail: {
      tags: ['General'],
      summary: 'API root endpoint to confirm server is running',
    }
  })
  .get('/api/health', () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'Bun + Elysia',
      version: Bun.version
    };
  }, {
    detail: {
      tags: ['General'],
      summary: 'Health check endpoint',
    },
    response: {
      200: t.Object({
        status: t.String(),
        timestamp: t.String(),
        server: t.String(),
        version: t.String()
      })
    }
  })
  .listen(3000);

console.log(`Elysia server is running at ${app.server?.hostname}:${app.server?.port}`);
console.log(`API documentation available at http://localhost:3000/swagger`);
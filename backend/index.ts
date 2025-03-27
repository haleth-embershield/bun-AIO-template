import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';

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
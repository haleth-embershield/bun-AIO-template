import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { staticPlugin } from '@elysiajs/static';
import { spawn } from 'bun';
import { join } from 'path';

// Paths
const FRONTEND_DIR = join(import.meta.dir, '..', 'frontend');
const FRONTEND_DIST = join(FRONTEND_DIR, 'dist');

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
  // Serve static frontend files in development
  .use(staticPlugin({
    assets: FRONTEND_DIST
  }))
  // Add a root endpoint to serve the homepage
  .get('/', () => {
    return Bun.file(join(FRONTEND_DIST, 'index.html'));
  })
  // Catch-all route to serve the SPA
  .get('*', ({ set }) => {
    set.headers['Content-Type'] = 'text/html';
    return Bun.file(join(FRONTEND_DIST, 'index.html'));
  })
  .listen(3000);

console.log(`Elysia server is running at ${app.server?.hostname}:${app.server?.port}`);
console.log(`API documentation available at http://localhost:3000/swagger`);
console.log(`Frontend is being served from ${FRONTEND_DIST}`); 
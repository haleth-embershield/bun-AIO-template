# Bun All-in-One Template

A template project for creating a React frontend with a Bun backend, containerized with Docker. This template uses Bun for both building the frontend and running the backend, with Nginx serving the frontend in production.

## Project Structure

- `/frontend`: React application built with Vite and Bun, with its own Dockerfile
- `/backend`: Bun server using Elysia.js, with its own Dockerfile
- `docker-compose.yml`: Configuration to build and run both services together

## Features

- **Backend**: Fast Bun server with Elysia.js
- **Frontend**: React with TypeScript
- **Development**: Hot reloading for both frontend and backend
- **Production**: Optimized Docker setup with Nginx serving the frontend
- **API Documentation**: Swagger UI at `/swagger`

## Installation Instructions

### Prerequisites

Bun and Docker

Windows:
```ps1
winget install Oven-sh.Bun; winget install Docker.DockerDesktop```
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd bun-AIO-template
   ```

2. Development mode (with hot reloading):
   ```bash
   # Install dependencies
   cd backend
   bun install
   cd ../frontend
   bun install
   cd ..
   
   # Run the development server
   cd backend
   bun run dev:all
   ```

3. Production mode with Docker:
   ```bash
   docker compose build && docker compose up -d
   ```

4. Access:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/swagger

## Development Workflow

- The `bun run dev:all` command in the backend directory will:
  1. Start the backend server that handles API requests
  2. Start the frontend development server with hot reloading
  3. Both servers will watch for changes in their respective code
  
- For frontend-only development, run:
  ```bash
  cd frontend
  bun run dev
  ```
  
- For backend-only development, run:
  ```bash
  cd backend
  bun run dev
  ```

## Adding Dependencies

- For frontend:
  ```bash
  cd frontend
  bun add <package-name>
  ```

- For backend:
  ```bash
  cd backend
  bun add <package-name>
  ```

## Troubleshooting

### MIME Type Errors

If you see errors like:
```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
```

Try these solutions:

1. **Development**:
   - Make sure you're running the frontend with `bun run dev` in development
   - Ensure Vite is correctly serving your files by using `bun run dev:all` from the backend directory

2. **Production**:
   - Check that nginx is correctly configured with proper MIME types
   - Rebuild your frontend with `bun run build` to ensure all files have proper extensions

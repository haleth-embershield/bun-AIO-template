# Use the Bun image
FROM oven/bun:1 AS runner

# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --production --frozen-lockfile

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "index.ts"] 
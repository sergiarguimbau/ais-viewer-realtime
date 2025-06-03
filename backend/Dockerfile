# Base Node image
FROM node:22-alpine

# Set working directory
WORKDIR /src

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy all code
COPY . .

# Build TypeScript (assuming your output dir is "dist")
RUN npm run build

# Expose Fastify port
EXPOSE 3000

# Default command (run compiled JS)
CMD ["node", "dist/index.js"]

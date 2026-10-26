# Multi-stage build for React Frontend
# Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51

# Stage 1: Build static assets using Node.js
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve application using lightweight Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default nginx public files
RUN rm -rf ./*

# Copy built artifacts from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration supporting SPA routing and backend proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose web server port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

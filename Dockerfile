# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the full source code
COPY . .

# Build the app (assuming this produces a /build directory)
RUN npm run build:prod

# Stage 2: Production image
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy your web files to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html

# Copy custom nginx config if you have one
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]